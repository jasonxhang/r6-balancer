import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { SuggestionList, SuggestionItem, NoSuggestions, PlayerInput, InputContainer } from './Autocomplete.styled';

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: -1,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
    };
  }

  // Event fired when the input value is changed
  onChange = (e) => {
    const suggestions = this.props.suggestions || [];
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
    this.props.handleChange(e);
  };

  // Event fired when the user clicks on a suggestion
  onClick = (e) => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: -1,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });

    console.log('this.state.e.currentTarget.innerText:', e.currentTarget.innerText);
    // this.props.setInputField(e.currentTarget.innerText);
    this.props.handleEnter(e.currentTarget.innerText);
  };

  // Event fired when the user presses a key down
  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.which === 13) {
      this.setState({
        activeSuggestion: -1,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
      this.props.handleEnter(filteredSuggestions[activeSuggestion]);
    } else if (e.which === 38) {
      // User pressed the up arrow, decrement the index
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.which === 40) {
      // User pressed the down arrow, increment the index
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeSuggestion, filteredSuggestions, showSuggestions, userInput },
    } = this;

    let suggestionsListComponent;
    console.log('this.state', this.state);
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <SuggestionList>
            {filteredSuggestions.map((suggestion, index) => (
              <SuggestionItem
                active={index === activeSuggestion ? 1 : 0}
                key={index}
                onClick={onClick}
                value={suggestion}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </SuggestionList>
        );
      } else {
        suggestionsListComponent = (
          <NoSuggestions>
            <em> No suggestions, you're on your own!</em>
          </NoSuggestions>
        );
      }
    }
    return (
      <InputContainer>
        <PlayerInput
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={this.props.inputField}
          placeholder="Enter a player's UPlay name"
        />
        {suggestionsListComponent}
      </InputContainer>
    );
  }
}
