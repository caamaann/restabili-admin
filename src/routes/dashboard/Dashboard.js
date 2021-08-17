import React, { useState, useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import { Pie, Line } from 'react-chartjs-2';
import '../../assets/styles/styles.css';

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    }
});



const Dashboard = () => {
    const classes = useStyles();
    const [roomData, setRoomData] = useState({});
    const [userData, setUserData] = useState({});
    const [onlineData, setOnlineData] = useState({});
    const [registeredData, setRegisteredData] = useState({});
    const [postsData, setPostsData] = useState({});

    const roomChart = () => {
        setRoomData({
            labels: [
                'Active Room',
                'Nonactive Room'
              ],
              datasets: [{
                label: 'Status Room Chat',
                data: [100, 50],
                backgroundColor: [
                  '#6c63ff',
                  '#ffc000',
                ],
                hoverOffset: 4
              }]
        })
    }

    const UserChart = () => {
        setUserData({
            labels: [
                'Participants',
                'Doctors'
              ],
              datasets: [{
                label: 'Status Room Chat',
                data: [50, 8],
                backgroundColor: [
                  '#6c63ff',
                  '#ffc000',
                ],
                hoverOffset: 4
              }]
        })
    }

    const OnlineChart = () => {
        setOnlineData({
            labels: [
                'Online Users',
                'Offline Users'
              ],
              datasets: [{
                label: 'Status Room Chat',
                data: [11, 30],
                backgroundColor: [
                  '#6c63ff',
                  '#ffc000',
                ],
                hoverOffset: 4
              }]
        })
    }

    const registeredUserChart = () => {
        setRegisteredData({
            labels: ['January', 'February', 'Maret', 'April', 'Mei', 'June', 'Juli', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              label: 'Resgistered User',
              data: [0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0],
              fill: false,
              borderColor: '#6c63ff',
              tension: 0.1
            }]
          })
    }

    const postsUserChart = () => {
        setPostsData({
            labels: ['January', 'February', 'Maret', 'April', 'Mei', 'June', 'Juli', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              label: 'User Posts',
              data: [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
              fill: false,
              borderColor: '#ffc000',
              tension: 0.1
            }]
          })
    }

    useEffect(() => {
        roomChart();
        UserChart();
        OnlineChart();
        registeredUserChart();
        postsUserChart();
    }, [])

    return (
        <div>
            <div className='row'>
                <div className='col-md-4'>
                    <div>
                        <Pie data={roomData}/>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div>
                        <Pie data={userData}/>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div>
                        <Pie data={onlineData}/>
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-md-6'>
                    <Line data={registeredData} />
                </div>
                <div className='col-md-6'>
                    <Line data={postsData} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
