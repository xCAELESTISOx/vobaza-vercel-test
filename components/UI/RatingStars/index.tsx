import React, { FC } from 'react';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

enum IconsSize {
  Small = 'Small',
  Normal = 'Normal',
  Big = 'Big',
}

interface RatingStars {
  editable?: boolean;
  size?: keyof typeof IconsSize;
  value?: number;
  onChange?: (index: number) => void;
}

interface RatingStarsEditable {
  size?: keyof typeof IconsSize;
  value?: number;
  onChange?: (index: number) => void;
}

interface RatingStarsReadOnly {
  size?: keyof typeof IconsSize;
  value?: number;
}

const RatingStarsEditable: FC<RatingStarsEditable> = ({
  size = IconsSize.Normal,
  value = 0,
  onChange = () => {},
}) => {
  const normalizeValue = Math.min(Math.max(value, 0), 5);

  const getContainerClass = () => {
    if (!Object.keys(IconsSize).includes(size)) size = IconsSize.Normal;

    if (size === IconsSize.Normal) return styles.ratingEditable;

    return styles[`ratingEditable${size}`];
  };

  const getStarClass = (index) => {
    if (5 - index === normalizeValue) return styles.ratingEditableStarActive;

    return styles.ratingEditableStar;
  };

  const handleClickStar = (index) => {
    onChange && onChange(index);
  };

  return (
    <div className={getContainerClass()}>
      <div className={styles.ratingEditableStars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={getStarClass(index)}
            onClick={() => handleClickStar(5 - index)}
          >
            <Icon name="Star" />
          </button>
        ))}
      </div>
    </div>
  );
};

const RatingStarsReadOnly: FC<RatingStarsReadOnly> = ({ size, value }) => {
  const getContainerClass = () => {
    if (!Object.keys(IconsSize).includes(size)) size = IconsSize.Normal;

    if (size === IconsSize.Normal) return styles.rating;

    return styles[`rating${size}`];
  };

  const starsWidth = (value / 5) * 100;

  return (
    <div className={getContainerClass()}>
      <div className={styles.ratingGrayStars}></div>
      <div
        className={styles.ratingFilledStars}
        style={{ width: `${starsWidth}%` }}
      ></div>
    </div>
  );
};

const RatingStars: FC<RatingStars> = ({
  editable = false,
  size = IconsSize.Normal,
  value = 0,
  onChange = () => {},
}) => {
  if (editable) {
    return (
      <RatingStarsEditable size={size} value={value} onChange={onChange} />
    );
  } else {
    return <RatingStarsReadOnly size={size} value={value} />;
  }
};

export { RatingStars };
