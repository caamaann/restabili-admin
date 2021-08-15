import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import ReactHtmlParser from 'react-html-parser';


const CardComponent = (props) => {

    function createMarkup() {
        return {__html: props.body.substring(0, 150)};
      }

    return (
        <div className='card'>
            <img src={props.img} className="card-img-top" />
            <div className='card-body'>
                <h2 className='card-title'>{props.title}</h2>
                <div dangerouslySetInnerHTML={createMarkup()} />
                {/* <p className='card-text'>{props.body.substring(0, 150)}...</p> */}
                <a href={props.link} className="btn btn-primary">Baca Selengkapnya</a>
                <h5>{props.created_at} | {props.author}</h5>
            </div>
        </div>
    );
}

export default CardComponent;
