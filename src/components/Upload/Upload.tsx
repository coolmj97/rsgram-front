import { Add } from '@/assets/icons/Add';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface UploadProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Upload = (props: UploadProps) => {
  const { onChange } = props;

  return (
    <>
      <Label htmlFor="file">
        <Add />
      </Label>
      <UploadInput type="file" id="file" onChange={onChange} multiple />
    </>
  );
};

export default Upload;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid #d3d3d3;
  border-radius: 20px;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;
