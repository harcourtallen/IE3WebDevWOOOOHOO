import React from 'react';
import './Card.css'

const card = (props) => {
    return (
        <div className="Card"
        onClick={props.click}>

            <p className="card_item">
                {props.children.username}: {props.children.email}
            </p>
        </div>
    );
}

export default card;
