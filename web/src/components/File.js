import React from 'react';

const File = ({ name, label, fileName, labelIcon, helpText,accept, onChange }) => {
  return (
    <div className='form-group'>
      <label>
        <i className={`fas ${labelIcon} mr-2`}></i>
        {label}
      </label>
      <div className='custom-file'>
        <input
          type='file'
          name={name}
          className='custom-file-input'
          id='customFile'
          onChange={onChange}
          accept={accept}
        />
        <label className='custom-file-label' htmlFor='customFile'>
          {fileName}
        </label>
      </div>
      <small id='fileHelpId' className='form-text text-muted'>
        {helpText}
      </small>
    </div>
  );
};

export default File;