import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';

const AllUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("dispatching...");
        dispatch(getAllUsers())
    }, [dispatch]);

    const { users } = useSelector(state => state.user)

    return (
        <Layout>
            {/* <h1>All Users</h1> */}
            <h4 className="text-center my-3"></h4>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>DETAILS</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, i) => (
                        <tr key={i + 1}>
                            <td>{i + 1}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.phone || 'NA'}</td>
                            <td>
                                <Link to={`/user-details/${user?._id || user?.id}`}>
                                    MORE DETAILS
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default AllUsers