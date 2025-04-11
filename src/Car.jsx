import carPlaceholder from './assets/car.png';

function Car({ 
    make = "Unknown",
    model = "Unknown",
    year = "Unknown",
    mileage = "Unknown",
    auctionDateTime = "Unknown",
    startingBid = "Unknown"
}){

    return(
        <div>
            <img src={carPlaceholder} alt="Car Image Placeholder" width="100%" height="100%" 
            style={{ maxWidth: '400px', maxHeight: '400px' }}/>
            <ul>
                <li>Make: {make}</li>
                <li>Model: {model}</li>
                <li>Year: {year}</li>
                <li>Mileage: {mileage} km</li>
                <li>Auction Date: {auctionDateTime}</li>
                <li>StartingBid: {startingBid} €</li>
            </ul>
        </div>
    );
}

export default Car