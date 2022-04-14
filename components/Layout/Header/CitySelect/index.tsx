import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { useAuth } from 'src/context/auth';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import CitySelectModal from './Modal/index';
import CitySelectQuestionModal from './Modal/question';

import styles from './styles.module.scss';
import { dadataApi } from 'assets/api/dadata';

type Props = {
  withoutFetch?: boolean;
};

const CitySelect: FC<Props> = ({ withoutFetch }) => {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const [city, setCity] = useState(null);
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
    if (withoutFetch) return;
    const res = await dadataApi.getAddressByIp();
    const json = await res.json();
    const newCity = json.location?.data.city || 'Москва';
    setCity(newCity);
    dispatch({ type: 'setCity', payload: newCity });
    setIsQuestionModalOpen(true);
  };
  const saveCity = (newCity: string) => {
    setCity(newCity);
    dispatch({ type: 'setCity', payload: newCity });
    Cookies.set('city', newCity);
  };

  useEffect(() => {
    const savedCity = router.query.city;
    if (savedCity) {
      setCity(savedCity);
    }
    const cookieCity = Cookies.get('city');
    if (!cookieCity) {
      getAddressByApi();
    } else if (!savedCity) {
      setCity(cookieCity);
    }
  }, []);

  useEffect(() => {
    if (city && router.query.city) {
      delete router.query['city'];
    }
  }, [city]);

  useEffect(() => {
    if (state.city) {
      setCity(state.city);
    }
  }, [state.city]);

  return (
    <div className={styles.citySelect}>
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
      <button className={styles.citySelectButton} onClick={toggleModal}>
        {city || router.query.city ? (
          <>
            <Icon name="Location" />
            {city || router.query.city}
            <Icon
              name="SmallArrowDown"
              className={isModalOpen ? styles.open : ''}
            />
          </>
        ) : (
          <div style={{ minWidth: '50px' }}></div>
        )}
      </button>
    </div>
  );
};

export default CitySelect;
