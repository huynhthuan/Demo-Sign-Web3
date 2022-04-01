import { useEthers } from '@usedapp/core';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
let Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);

export default function Home() {
    const { activateBrowserWallet, account } = useEthers();
    const email = useRef();
    const password = useRef();
    const [signDataText, setSignDataText] = useState('');

    const sign = async () => {
        try {
            let dataToSign = 'huynie007@gmail.com123123' + account;
            let res = await web3.eth.personal.sign(dataToSign, account);
            setSignDataText(res);
        } catch (error) {
            console.log(error);
        }
    };

    const loginWallet = () => {
        activateBrowserWallet();
    };

    const loginAccount = async () => {
        // login api
        const params = new URLSearchParams();

        params.append('email', email.current.value);
        params.append('password', password.current.value);
        params.append('wallet', account);

        try {
            let res = await axios.post('', params);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container className="pt-5">
            {account ? (
                <Button
                    onClick={() => {
                        sign();
                    }}
                >
                    Sign data
                </Button>
            ) : (
                <Button
                    onClick={() => {
                        loginWallet();
                    }}
                >
                    Login
                </Button>
            )}

            <p className="mt-2">Data signed: {signDataText}</p>

            <div className="form-login mt-5">
                <div className="mb-2">
                    <input type="text" ref={email} className="form-control mb-2 w-25" placeholder="email" />
                    <input type="text" ref={password} className="form-control w-25" placeholder="password" />
                </div>
                <Button
                    type="button"
                    onClick={() => {
                        loginAccount();
                    }}
                >
                    Login
                </Button>
            </div>
        </Container>
    );
}
