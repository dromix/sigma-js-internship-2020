import Box from '@material-ui/core/Box';
import dayjs from 'dayjs';
import React, { MouseEvent, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addFriendToDB } from '../../../services/apiUserService';
import { getUserFromStorage } from '../../../services/localStorageService';
import { IUser, status } from '../../interfaces/Interface';
import { useFriends } from '../../storage/friends/friendsContext';
import { UserPhoto } from '../userPhoto/UserPhoto';
import './userCard.scss';

type MainInfoProps = {
  mainInfo: IUser;
  boxShadow?: number;
  isProfile?: boolean;
};

const UserCard: React.FC<MainInfoProps> = ({ mainInfo, boxShadow, isProfile }) => {
  const [loginedUser, setLoginedUser] = useState(getUserFromStorage());
  const [userAge, setUserAge] = useState<number>();
  const {friends, addFriendToContext} = useFriends()

  const sendFriendRequest = (event: MouseEvent) => {
    event.preventDefault();
    const friendId = {
      ID: mainInfo._id
    };

    addFriendToDB(loginedUser._id, friendId).then(res => {
       if (res === status.SUCCESS) {addFriendToContext(mainInfo._id); }
    });
  };

  useEffect(() => {
    const date = dayjs(new Date());
    const age = date.diff(mainInfo.birthday, 'year');
    setUserAge(age);
  }, [mainInfo.birthday]);

  return (
    <>
      {/* TIME DECISION */}
      {!loginedUser ? (
        <Redirect to="/login" />
      ) : (
          <Box boxShadow={boxShadow && 2} className="user-card">
            <Link to={`/user/${mainInfo._id}`} className={isProfile ? 'leftbar disabled' : 'leftbar'}>
              <UserPhoto avatar={mainInfo.avatar} />
              <h3>
                {mainInfo.firstName} {mainInfo.lastName}
              </h3>
              <p>{userAge} y.o.</p>
              <div className="flag">
                <img src={`https://www.countryflags.io/${mainInfo.countryCode}/flat/24.png`} alt="Country flag" />
                <p>{mainInfo.country}</p>
              </div>
            </Link>
            <div className="rightbar">
              <div className="speaks">
                <h3>Speaks</h3>
                {mainInfo.speak.map((speaksInfo, id) => {
                  return (
                    <div className="languages" key={id}>
                      <p>{speaksInfo.language}</p>
                      <p>{speaksInfo.level}</p>
                    </div>
                  );
                })}
              </div>
              <div className="learning">
                <h3>Learning</h3>
                {mainInfo.learn.map((learnInfo, id) => {
                  return (
                    <div className="languages" key={id}>
                      <p>{learnInfo.language}</p>
                      <p>{learnInfo.level}</p>
                    </div>
                  );
                })}
              </div>
              {loginedUser._id !== mainInfo._id && (
                <div className="buttons-action">
                  {!friends.has(mainInfo._id) && (
                    <Link to="/" onClick={sendFriendRequest} className="add-friend">
                      add friend
                    </Link>
                  )}
                  <Link to="/chat" className="send-message">
                    message
                </Link>
                </div>
              )}
            </div>
          </Box>
        )}
    </>
  );
};

export default UserCard;
