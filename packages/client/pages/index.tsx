import { Dashboard } from 'components/Dashboard';
import { FileInput } from 'components/FileInput';
import { GetStaticPropsContext } from 'next';
import { LoginForm } from 'components/LoginForm';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '@cultural-aid/core/redux/selectors/userSelector';

const HomePage = () => {
  const { value: user } = useSelector(userSelector);

  return (
    <>
      {user && <Dashboard />}
      {!user && <LoginForm />}
    </>
  );
};

export default HomePage;

export async function getStaticProps(_context: GetStaticPropsContext) {
  return {
    props: {},
  };
}
