import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import './UserList.css';

const UserList = () => {
  
  return (
    <div className="container mt-3 mb-4">
      <div className="row justify-content-center">
        <div className="col-lg-9 mt-4 mt-lg-0">
          {/* Search Bar and Add New User Button */}
          <div className="input-group mb-3">
            <input type="text" className="form-control search-bar" placeholder="Search by name or email" />
            <div className="input-group-append">
              <button className="btn btn-primary ml-2" type="button">Add New User</button>
            </div>
          </div>

          <div className="user-dashboard-info-box table-responsive mb-0 bg-dark p-4 shadow-sm">
            <table className="table manage-candidates-top mb-0 table-dark">
              <thead>
                <tr>
                  <th>Candidate Name</th>
                  <th className="action text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="candidates-list">
                  <td className="title">
                    <div className="thumb">
                      <img className="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/>
                    </div>
                    <div className="candidate-list-details">
                      <div className="candidate-list-info">
                        <div className="candidate-list-title">
                          <h5 className="mb-0">Mohammed Mishal</h5>
                        </div>
                        <div className="candidate-list-option">
                          <ul className="list-unstyled">
                            <li><i className="fas fa-filter pr-1"></i>mohdmishal18@gmail.com</li>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
