import styled from 'styled-components';
import axios from 'axios';
import { useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import Times from './Times';


export default function MovieSelect({id}){
  
    const [sessions, setSessions] = React.useState([]);

    let params = useParams();

	useEffect(() => {
		const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${params.id}/showtimes`);

		promise.then(resposta => {
			setSessions(resposta.data);
		});

	}, []);

	if(sessions.length ===  0) {
		return (<h1>Loading...</h1>);
	}

    console.log(sessions); 

    return( 
        <>
            <Text>Selecione o horário</Text>
            <Container>
            {sessions.days.map((session) => (
                <>
                    <TextDate id={session.id}>
                        {session.weekday} - {session.date}
                    </TextDate>
                    <OrangeBoxes>
                        <Times showtimes={session.showtimes}/>
                    </OrangeBoxes>
                </>
            ))}
            </Container>
            <Footer>
                <PosterBox >
                    <Poster id={sessions.id} src={sessions.posterURL} alt={sessions.title}/>
                </PosterBox>
                <TextDate> {sessions.title} </TextDate>
            </Footer>
        </>
    );
}

const Footer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
    position: fixed;
    left:0;
    bottom:0;
    height: 117px;
    justify-content: center;
    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #293845;
    }
` ;

const Text = styled.h1`
    color:#293845;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;
` ;

const OrangeBoxes = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    a{
        text-decoration: none;
    }
`
const TextDate =styled.h1`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: #293845;
`

const Container= styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-bottom: 125px;
`

const PosterBox = styled.div`
    width: 64px;
    height:89px;;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:10px;
    background: #ffffff;
` ;

const Poster = styled.img`
    width:48px;
    height: 72px;;
` ;
