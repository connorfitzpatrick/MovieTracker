import React from 'react'

const Header = (props) => {
    if (props.buttonsState) {
        return (
            <div>
                <h1 className="font-weight-light display-1 text-center">My Movie Watchlist</h1>
            </div>
        )
    } else {
        return (
        <div>
            <h1 className="font-weight-light display-1 text-center">The Internet's Top 250 Movies</h1>
        </div>
        )
    }
}

export default Header
