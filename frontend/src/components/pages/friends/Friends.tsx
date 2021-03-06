import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFriends } from '../../../services/apiUserService';
import Layout from '../../shared/layout/Layout';
import UserList from '../../shared/userList/UserList';
import './friends.scss';

interface MatchParams {
  id: number & string;
}

const Friends: React.FC = () => {
  const [friends, setFriends] = useState([]);
  const { id } = useParams<MatchParams>();

  useEffect(() => {
    getFriends(id).then(users => setFriends(users));
  }, [id]);

  return (
    <Layout pageTitle="Friends" countFriends={friends.length}>
      <UserList users={friends} />
    </Layout>
  );
};

export default Friends;
