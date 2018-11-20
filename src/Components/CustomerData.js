import React, { Component } from 'react';
import { mapStateToProps } from '../actions/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RemoveButton from './RemoveButton';
class CustomerData extends Component {
    // state = {  }
    constructor(props) {
        super(props);
    }
    render() { 
        let i = 1;
      return (
          <div className="container text-center">
            <div className='text-right'>
                <button
                    className='btn btn-primary'>
                    <Link to='/accountchange' >
                        <span>account</span>
                    </Link>
                </button>
            </div>
          <h1>User Management</h1>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>#</th>
                <th>UserID</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Created Date</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>{
              this.props.userData.map(function (item, key) {
                return (
                  <tr key={ key }>
                    <td>{ i++ }</td>
                    <td>{ item.id }</td>
                    <td>{ item.userName }</td>
                    <td>{ item.email }</td>
                    <td>{ item.createdAt }</td>
                    <td>
                        <button role='edit' className='btn btn-warning' key='1'>
                            EDIT
                        </button>
                    </td>
                    <td>
                        <RemoveButton index={ i } email={ item.email}/>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      )
    }
}
 
export default connect(mapStateToProps)(CustomerData);