import React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
});

const Label = styled('p')({
  color: '#b9bbbe',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '1rem',
});

const Input = styled('input')({
  flexGrow: 1,
  height: '2.5rem',
  border: '1px solid #000',

  borderRadius: '5px',
  color: '#dcddde',
  background: '#35393f',
  margin: 0,
  fontSize: '1rem',
  padding: '0 5px',
});
function InputWithLabel(props) {
  const { value, setValue, label, type, placeholder } = props;

  const valueChangeHandler = event => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={valueChangeHandler}
        type={type}
        placeholder={placeholder}
        style={props.additionalStyles ? props.additionalStyles : {}}
      />
    </Wrapper>
  );
}

export default InputWithLabel;
