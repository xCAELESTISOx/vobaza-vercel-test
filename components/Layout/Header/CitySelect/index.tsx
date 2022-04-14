import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { dadataApi } from 'assets/api/dadata';
import { useAuth } from 'src/context/auth';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import CitySelectModal from './Modal/index';
import CitySelectQuestionModal from './Modal/question';

import styles from './styles.module.scss';

const CitySelect: FC = () => {
  const { state, dispatch } = useAuth();
  const [city, setCity] = useState(Cookies.get('city'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };
  const onQuestionSubmit = () => {
    closeQuestionModal();
    saveCity(city);
  };
  const onQuestionCancel = () => {
    closeQuestionModal();
    setIsModalOpen(true);
  };

  const getAddressByApi = async () => {
    const res = await dadataApi.getAddressByIp();
    const json = await res.json();
    const newCity = json.location?.data.city || 'Москва';
    setCity(newCity);
    setIsQuestionModalOpen(true);
  };
  const saveCity = (newCity: string) => {
    setCity(newCity);
    dispatch({ type: 'setCity', payload: newCity });
    Cookies.set('city', newCity);
  };

  useEffect(() => {
    const savedCity = Cookies.get('city');
    if (savedCity) {
      setCity(savedCity);
    } else {
      getAddressByApi();
    }
  }, []);

  useEffect(() => {
    if (state.city) {
      setCity(state.city);
    }
  }, [state.city]);

  return (
    <div className={styles.citySelect} suppressHydrationWarning={true}>
      {isModalOpen && (
        <CitySelectModal setCity={saveCity} closeModal={closeModal} />
      )}
      {isQuestionModalOpen && (
        <CitySelectQuestionModal
          city={city}
          closeModal={closeQuestionModal}
          onSubmit={onQuestionSubmit}
          onCancel={onQuestionCancel}
        />
      )}
      {city && (
        <button
          className={styles.citySelectButton}
          onClick={toggleModal}
          suppressHydrationWarning={true}
        >
          <Icon name="Location" />
          {city}
          <Icon
            name="SmallArrowDown"
            className={isModalOpen ? styles.open : ''}
          />
        </button>
      )}
    </div>
  );
};

export default CitySelect;
