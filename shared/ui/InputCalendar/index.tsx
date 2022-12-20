import React, { useRef } from 'react';
import Calendar from 'react-calendar';

import type { CalendarProps } from 'react-calendar';
import { useClickOutside } from '@nebo-team/vobaza.ui.filter-select/dist/filter-select';
import { useToggle } from 'shared/lib/hooks/useToggle';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';

import styles from './styles.module.scss';

type Props = {
  label: string;
  name: string;
  value?: Date | null;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  calendarOptions: CalendarProps;
  onChange?: (date: Date) => void;
};

const InputCalendar = (props: Props) => {
  const { label, name, value, required, disabled, calendarOptions, error, onChange } = props;

  const [isOpen, toggleCalendar] = useToggle(false);

  const calendarWrapperRef = useRef(null);

  const onChangeHandler = (val: Date) => {
    onChange && onChange(val);

    toggleCalendar(false);
  };

  const formatedDate = () => {
    if (value instanceof Date) return value.toLocaleDateString();

    return value || '';
  };

  useClickOutside(calendarWrapperRef, () => {
    toggleCalendar(false);
  });

  return (
    <div ref={calendarWrapperRef} className={styles.inputWrapper}>
      <InputText
        label={label}
        name={name}
        value={formatedDate()}
        disabled={disabled}
        required={required}
        onClick={toggleCalendar}
        error={error}
        readonly
      />
      {isOpen && <Calendar {...calendarOptions} onChange={onChangeHandler} value={value} className={styles.calendar} />}
    </div>
  );
};

export { InputCalendar };
