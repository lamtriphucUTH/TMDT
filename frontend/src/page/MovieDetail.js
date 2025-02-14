import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/MovieDetail.scss";

const ProductDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${movieId}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  const handlePurchase = () => {
    const totalPrice = tickets * movie.price;
    alert(
      `You have purchased ${tickets} tickets for ${
        movie.title
      } on ${selectedDate} at ${selectedShowtime} for $${totalPrice.toFixed(
        2
      )} using ${paymentMethod}`
    );
    // Reset form
    setTickets(1);
    setSelectedDate("");
    setSelectedShowtime("");
    setPaymentMethod("credit-card");
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1 className="product-detail__title">{movie.title}</h1>
      <img
        className="product-detail__image"
        src={movie.image || "placeholder-image.jpg"}
        alt="Movie Poster"
      />
      <p className="product-detail__description">{movie.description}</p>
      <div className="product-detail__info">
        <div className="product-detail__info-item">
          Release Date: {movie.releaseDate}
        </div>
        <div className="product-detail__info-item">
          Duration: {movie.duration} minutes
        </div>
        <div className="product-detail__info-item">Genre: {movie.genre}</div>
      </div>
      <div className="booking-section">
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </label>
        <label>
          Showtime:
          <select
            value={selectedShowtime}
            onChange={(event) => setSelectedShowtime(event.target.value)}
          >
            <option value="">Select Showtime</option>
            {movie.showtimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
        <label>
          Number of Tickets:
          <input
            type="number"
            value={tickets}
            onChange={(event) => setTickets(event.target.value)}
            min="1"
          />
        </label>
        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
            <option value="Momo">Momo</option>
          </select>
        </label>
        <button onClick={handlePurchase}>Purchase</button>
      </div>
    </div>
  );
};

export default ProductDetail;
