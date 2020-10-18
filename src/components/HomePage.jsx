import React, { useEffect, useState } from 'react';
import { Form, Button, Row, ListGroup, Spinner, Table, Alert } from 'react-bootstrap';
import {
  InputNameContainer,
  PageContainer,
  RowContainer,
  InputContainer,
  PlayerCount,
  RightHandCloseButton,
  TeamContainer,
  TeamsContainer,
  FormInputs,
  PlayerPoolContainer,
  PlayerPoolRow,
  PlayerTeamRow,
  BlueTeamTableTh,
  BlueTeamTableTd,
  OrangeTeamTableTh,
  OrangeTeamTableTd,
  TeamHeader,
  NewTeamsButton,
  BalancerContainer,
  AlertContainer,
} from './HomePage.styled';
import Autocomplete from './Autocomplete';

import { useCookies } from 'react-cookie';

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const HomePage = () => {
  const [inputField, setInputField] = useState('');
  const [names, setNames] = useState([]);
  const [algoInputs, setAlgoInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blueTeam, setBlueTeam] = useState([]);
  const [orangeTeam, setOrangeTeam] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['pastPlayers']);
  const [pastPlayerPool, setPastPlayerPool] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    let pastPlayersArr;
    if (cookies.pastPlayers) {
      pastPlayersArr = cookies.pastPlayers;
    }
    setPastPlayerPool(pastPlayersArr);
  }, []);

  const handleChange = (event) => {
    let val = event.target.value;
    setInputField(val);
  };

  const handleEnter = (playerName = null) => {
    if (names.includes(playerName || inputField)) {
      setAlert(true);
      return;
    }
    if (playerName) {
      setNames([...names, playerName]);
      setInputField('');
    } else if (inputField && names.length < 10) {
      console.log('inputField back on 71:', inputField);
      setNames([...names, inputField]);
      setInputField('');
    }
  };

  const dismissAlert = () => {
    setAlert(false);
  };

  const addPlayerClickHandler = () => {
    if (inputField && names.length < 10) {
      setNames([...names, inputField]);
      setInputField('');
    }
  };
  const handleCheckbox = (event) => {
    let val = event.target.value;
    if (algoInputs.includes(val)) {
      setAlgoInputs(algoInputs.filter((input) => input !== val));
    } else {
      setAlgoInputs([...algoInputs, val]);
    }
  };
  const handleRemove = (val) => {
    setNames(names.filter((name) => name !== val));
  };
  const handleGenerate = async () => {
    const namesCopy = [...names];

    let newPlayerPoolArr = [];
    let tmp = [];
    if (cookies.pastPlayers) {
      tmp = cookies.pastPlayers;
    }
    namesCopy.forEach((name) => {
      if (!tmp.includes(name)) {
        newPlayerPoolArr.push(name);
      }
    });
    console.log('newPlayerPoolArr.concat(tmp):', newPlayerPoolArr.concat(tmp));
    setCookie('pastPlayers', newPlayerPoolArr.concat(tmp));

    setLoading(true);
    const shuffled = shuffle(namesCopy);
    let half_length = Math.ceil(shuffled.length / 2);
    let leftSide = shuffled.splice(0, half_length);

    const timeOutPromise = new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });

    Promise.all([timeOutPromise]).then(([response]) => {
      setOrangeTeam([...leftSide]);
      setBlueTeam([...shuffled]);
      setLoading(false);
      setGenerated(true);
      setNames([]);
    });
  };

  const handleNewTeams = () => {
    setGenerated(false);
    setNames([]);
    setAlgoInputs([]);
    if (cookies.pastPlayers) {
      setPastPlayerPool(cookies.pastPlayers);
    }
  };

  const haveAllFields = names.length > 0 && names.length % 2 === 0 && algoInputs.length > 0 && names.length < 11;

  console.log('input field', inputField);
  return (
    <PageContainer>
      {alert && (
        <AlertContainer variant="danger" onClose={dismissAlert} dismissible>
          <Alert.Heading>You can't add the same player twice!</Alert.Heading>
        </AlertContainer>
      )}
      {!generated && (
        <BalancerContainer>
          Dr. Fetus' Rainbow Six Scrim Balancer
          <InputContainer>
            <Autocomplete
              inputField={inputField}
              disabled={names.length >= 10}
              placeholder="Enter a player's UPlay name"
              handleChange={handleChange}
              handleEnter={handleEnter}
              suggestions={pastPlayerPool}
              setInputField={setInputField}
            />
          </InputContainer>
          <div key={`inline-checkbox`} className="mb-3">
            <Form.Check
              inline
              label="Stat 1"
              value="Stat 1"
              type="checkbox"
              id="inline-checkbox-1"
              onChange={handleCheckbox}
            />
            <Form.Check
              inline
              label="Stat 2"
              value="Stat 2"
              type="checkbox"
              id="inline-checkbox-2"
              onChange={handleCheckbox}
            />
            <Form.Check
              inline
              label="Stat 3"
              value="Stat 3"
              type="checkbox"
              id="inline-checkbox-3"
              onChange={handleCheckbox}
            />
          </div>
          <RowContainer>
            <Button disabled={names.length >= 10} onClick={addPlayerClickHandler} variant="outline-primary">
              Add Player
            </Button>
            <Button
              disabled={!haveAllFields}
              variant={haveAllFields ? 'success' : 'outline-success'}
              onClick={handleGenerate}
            >
              Generate Teams
            </Button>
          </RowContainer>
          <PlayerCount>Players added: {names.length}</PlayerCount>
          {names.length > 0 && (
            <PlayerPoolContainer>
              {names.map((name, idx) => (
                <PlayerPoolRow color="black" key={idx}>
                  {name}
                  <RightHandCloseButton>
                    <div onClick={() => handleRemove(name)}>x</div>
                  </RightHandCloseButton>
                </PlayerPoolRow>
              ))}
            </PlayerPoolContainer>
          )}
        </BalancerContainer>
      )}

      {loading && <Spinner style={{ marginTop: '50px' }} variant="secondary" animation="border" size="lg" />}

      {generated && (
        <>
          <TeamsContainer>
            <TeamContainer>
              <TeamHeader>Blue Team</TeamHeader>
              <Table bordered hover>
                <thead>
                  <tr>
                    <BlueTeamTableTh>Player Name</BlueTeamTableTh>
                    <BlueTeamTableTh>Score</BlueTeamTableTh>
                  </tr>
                </thead>
                <tbody>
                  {blueTeam.map((name, idx) => (
                    <tr key={name}>
                      <BlueTeamTableTd>{name}</BlueTeamTableTd>
                      <BlueTeamTableTd>{Math.floor(Math.random() * 3500) + 2000}</BlueTeamTableTd>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TeamContainer>
            <TeamContainer>
              <TeamHeader>Orange Team</TeamHeader>
              <Table bordered hover>
                <thead>
                  <tr>
                    <OrangeTeamTableTh>Player Name</OrangeTeamTableTh>
                    <OrangeTeamTableTh>Score</OrangeTeamTableTh>
                  </tr>
                </thead>
                <tbody>
                  {orangeTeam.map((name, idx) => (
                    <tr key={name}>
                      <OrangeTeamTableTd>{name}</OrangeTeamTableTd>
                      <OrangeTeamTableTd>{Math.floor(Math.random() * 3500) + 2000}</OrangeTeamTableTd>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TeamContainer>
          </TeamsContainer>
          <NewTeamsButton onClick={handleNewTeams}>Generate New Teams</NewTeamsButton>
        </>
      )}
    </PageContainer>
  );
};

export default HomePage;
