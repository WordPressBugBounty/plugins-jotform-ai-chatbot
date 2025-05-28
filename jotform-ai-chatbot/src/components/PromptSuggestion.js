/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, {
  forwardRef, useEffect, useRef, useState
} from 'react';
import PropTypes from 'prop-types';

import { getSentenceRecommendations } from '../api';
import { highlightMatches } from '../utils';

const PromptSuggestion = forwardRef(({
  inputValue, onSelect
}, ref) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const debounceTimeout = useRef(null);
  const latestRequestRef = useRef(0);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(
    () => () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    },
    []
  );

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (hasSelected) {
      return;
    }

    // If input is invalid, clear suggestions and do not proceed
    if (!inputValue || inputValue.length < 5 || inputValue.length > 100) {
      setSuggestions([]);
      setIsPopoverVisible(false);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      const currentRequestId = Date.now();
      latestRequestRef.current = currentRequestId;

      try {
        const response = await getSentenceRecommendations(inputValue);
        if (latestRequestRef.current === currentRequestId) {
          const results = Array.isArray(response) ? response : [];
          setSuggestions(results.slice(0, 5));
          setIsPopoverVisible(results.length > 0);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        if (latestRequestRef.current === currentRequestId) {
          setSuggestions([]);
          setIsPopoverVisible(false);
        }
      }
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue, hasSelected]);

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    setSuggestions([]);
    setIsPopoverVisible(false);
    setHasSelected(true);

    // Clear any pending debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  };

  useEffect(() => {
    if (inputValue === '') {
      setHasSelected(false);
    }
  }, [inputValue]);

  const keywords = Array.from(
    new Set(
      inputValue
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0)
    )
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current
        && !ref.current.contains(event.target)
        && !event.target.getAttribute('data-suggestion')
      ) {
        setIsPopoverVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return isPopoverVisible && suggestions.length > 0 ? (
    <div className='prompt-suggestion'>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleSelect(suggestion)}
          onMouseDown={(e) => e.preventDefault()}
          data-suggestion
          className='prompt-suggestion-item'
        >
          {highlightMatches(suggestion, keywords)}
        </div>
      ))}
    </div>
  ) : null;
});

PromptSuggestion.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default PromptSuggestion;
