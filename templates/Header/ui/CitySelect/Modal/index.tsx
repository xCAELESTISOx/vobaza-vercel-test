import { useClickOutside } from '@nebo-team/vobaza.ui.filter-select/dist/filter-select';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { dadataApi } from 'app/api/dadata';
import React, { FC, useEffect, useRef, useState } from 'react';
import useDebounce from 'src/hooks/useDebounce';

import styles from './styles.module.scss';

const citiesList = [
  'Москва',
  'Владимир',
  'Санкт-Петербург',
  'Архангельск',
  'Владивосток',
  'Волгоград',
  'Воронеж',
  'Екатеринбург',
  'Ижевск',
  'Иркутск',
  'Казань',
  'Красноярск',
  'Мурманск',
  'Набережные Челны',
  'Нижний Новгород',
  'Новосибирск',
  'Омск',
  'Пермь',
  'Ростов-на-Дону',
  'Саратов',
  'Самара',
];

type Props = {
  setCity: (city: string) => void;
  closeModal: () => void;
};

const CitySelectModal: FC<Props> = ({ setCity, closeModal }) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => closeModal());
  const suggestRef = useRef(null);
  useClickOutside(suggestRef, () => setCities([]));
  const [value, setValue] = useState('');
  const [cities, setCities] = useState([]);

  const selectCity = (e) => {
    e.preventDefault();
    setCity(e.target.dataset.cityId || 'Москва');
    closeModal();
  };

  //Search
  const searchCity = async () => {
    const res = await dadataApi.findCity(value);
    const json = await res.json();
    const citiesFromRes = json.suggestions;
    setCities(citiesFromRes);
  };

  const setValueHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchCity();
  };

  const debouncedSearchCity = useDebounce(searchCity, 800);

  useEffect(() => {
    if (value) {
      debouncedSearchCity();
    }
  }, [value]);

  return (
    <div className={styles.citySelectModal} ref={modalRef}>
      <Icon name="Cross" className={styles.citySelectModalCross} onClick={closeModal} />
      <div className={styles.citySelectModalTitle}>Выбор города</div>
      <form className={styles.citySelectModalSearchContainer}>
        <input
          name="text"
          className={styles.citySelectModalSearch}
          value={value}
          onChange={setValueHandler}
          title="Найти город"
          placeholder="Найти город"
        />
        <button className={styles.citySelectModalSearchButton} onClick={onSubmit}>
          <Icon className={styles.citySelectModalSearchIcon} name="Magnifier" />
        </button>
        {cities.length > 0 && (
          <div className={styles.citySelectModalSuggest} ref={suggestRef}>
            {cities.map((cityItem) => (
              <div
                key={cityItem.value}
                data-city-id={cityItem.data.city}
                className={styles.citySelectModalSuggestItem}
                onClick={selectCity}
              >
                {cityItem.value}
              </div>
            ))}
          </div>
        )}
      </form>
      <div className={styles.citySelectModalList}>
        {citiesList.map((cityItem) => (
          <div className={styles.citySelectModalListItem} data-city-id={cityItem} key={cityItem} onClick={selectCity}>
            {cityItem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitySelectModal;
