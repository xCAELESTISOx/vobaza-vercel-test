import React, { FC, useRef, useEffect, useState, ChangeEventHandler } from 'react';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

const ONE_MB = 100000;

interface UploadPhotosFiles {
  files: Array<File>;
  onClick: (index) => void;
}

const UploadPhotosFiles: FC<UploadPhotosFiles> = ({ files = [], onClick = () => {} }) => {
  return (
    <div className={styles.files}>
      {files.map((file, index) => (
        <div key={file.name + file.type + index} className={styles.filesItem} onClick={() => onClick(index)}>
          <div className={styles.filesItemIcon}>
            <Icon name="Cross" />
          </div>
          <span>{file.name}</span>
        </div>
      ))}
    </div>
  );
};

const UploadPhotos = ({ onChange }) => {
  const fileinputRef = useRef<null | HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);

  const openSelectFiles = () => {
    if (fileinputRef.current) {
      fileinputRef.current.click();
    }
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files[0];

    if (!file || file.size > 8 * ONE_MB || (file.type !== 'image/jpeg' && file.type !== 'image/png')) return;

    setSelectedFiles([...selectedFiles, file]);
  };

  useEffect(() => {
    onChange && onChange(selectedFiles);
  }, [selectedFiles]);

  const deleteFile = (index: number) => {
    try {
      const newSelected = [...selectedFiles];
      newSelected.splice(index, 1);
      setSelectedFiles(newSelected);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.uploadPhotosContainer}>
      <input
        ref={fileinputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        accept="image/png,image/jpeg"
        onChange={handleChangeInput}
      />
      {Boolean(selectedFiles.length) && <UploadPhotosFiles files={selectedFiles} onClick={deleteFile} />}
      <button className={styles.uploadPhotosBtn} type="button" onClick={openSelectFiles}>
        <Icon name="SmallPlus" />
        {!selectedFiles.length ? 'Добавить фото' : 'Загрузить еще'}
      </button>
      <div className={styles.uploadPhotosNotion}>jpg, png до 8Мб</div>
    </div>
  );
};

export { UploadPhotos };
