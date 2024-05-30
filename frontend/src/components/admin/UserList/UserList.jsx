import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../user/Loader';
import { useGetUsersMutation } from '../../../slices/admin/adminApiSlice';
import './UserList.css';

import AddUser from './AddUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [userCount, setUserCount] = useState(users?.length || 0);
  const [showAddUser, setShowAddUser] = useState(false);

  const [getUsers, { isLoading }] = useGetUsersMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await getUsers();
        setUsers(usersData.data);
      } catch (error) {
        // Handle error
      }
    }
    fetchData();
  }, [userCount , showAddUser]);

  useEffect(() => {
    let searchedUsers = filterUser(search, users);
    setFilteredUsers(searchedUsers);
  }, [search, users]);

  const filterUser = (text, usersList) => {
    if (text === '') {
      return usersList;
    } else {
      const filtered = usersList.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
      );
      return filtered;
    }
  };

  const handleAddUserClick = () => {
    setShowAddUser(true);
  };

  const handleCloseAddUser = () => {
    setShowAddUser(false);
  };

  return (
    <div className="container mt-3 mb-4">
      <div className="row justify-content-center">
        <div className="col-lg-9 mt-4 mt-lg-0">
          {/* Search Bar and Add New User Button */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary ml-2"
                type="button"
                onClick={handleAddUserClick}
              >
                Add New User
              </button>
            </div>
          </div>
          {showAddUser && <AddUser onClose={handleCloseAddUser} />}
          <div className="user-dashboard-info-box table-responsive mb-0 bg-dark p-4 shadow-sm">
            {isLoading ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : (
              <table className="table manage-candidates-top mb-0 table-dark">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th className="action text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr className="candidates-list" key={index}>
                      <td className="title">
                        <div className="thumb">
                          <img className="img-fluid" src={user.profileImage} alt="" />
                        </div>
                        <div className="candidate-list-details">
                          <div className="candidate-list-info">
                            <div className="candidate-list-title">
                              <h5 className="mb-0">{user.name}</h5>
                            </div>
                            <div className="candidate-list-option">
                              <ul className="list-unstyled">
                                <li><i className="fas fa-filter pr-1"></i>{user.email}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-info action-btn" title="Edit"><FaPencilAlt /></button>
                        <button className="btn btn-sm btn-danger" title="Delete"><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
