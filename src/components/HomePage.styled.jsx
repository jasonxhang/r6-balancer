import styled from 'styled-components';
import { Row, Table, Button, Alert } from 'react-bootstrap';

export const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 50px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  font-family: Scout-Regular;
`;
export const BalancerContainer = styled.div`
  width: 100%;
  margin: 200px auto 0px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const InputContainer = styled.div`
  width: 80%;
`;

export const PlayerCount = styled.div``;

export const RightHandCloseButton = styled.div`
  cursor: pointer;
  top: calc((100% / 2) - 12px);
  right: 5px;
  color: rgb(119, 119, 119);
`;

export const TeamsContainer = styled.div`
  margin-top: 20px;
  width: 900px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

export const TeamContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormInputs = styled.div``;

export const PlayerPoolContainer = styled.div`
  margin: auto;
  margin-top: 50px;
`;

export const PlayerPoolRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 50px;
  margin-top: 10px;
  width: 300px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  height: 40px;
  align-items: center;
`;
export const BlueTeamTableTh = styled.th`
  border: 1px solid blue !important;
`;

export const BlueTeamTableTd = styled.td`
  border: 1px solid blue !important;
`;

export const OrangeTeamTableTh = styled.th`
  border: 1px solid orange !important;
`;

export const OrangeTeamTableTd = styled.td`
  border: 1px solid orange !important;
`;

export const TeamHeader = styled.div`
  margin-bottom: 20px;
`;

export const NewTeamsButton = styled(Button)`
  margin-top: 50px;
`;

export const AlertContainer = styled(Alert)`
  position: absolute;
  top: 50px;
`;
