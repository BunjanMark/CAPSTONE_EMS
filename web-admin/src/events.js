import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faHeart, faSearch, faChevronDown, faEllipsisV, faUser, faBox, faCommentDots, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Events() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('All');
  const [showMenu, setShowMenu] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filterEventsByDate = (option) => {
    setSortOption(option);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Filter by search term
      const isMatchingSearch = event.name.toUpperCase().includes(search.toUpperCase());
      
      // Filter by date
      const eventDate = new Date(event.date);
      const today = new Date();
      
      if (sortOption === 'This Week') {
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + 7);
        return isMatchingSearch && eventDate >= today && eventDate <= weekEnd;
      } 
      else if (sortOption === 'Next Week') {
        const nextWeekStart = new Date(today);
        nextWeekStart.setDate(today.getDate() + 7);
        const nextWeekEnd = new Date(today);
        nextWeekEnd.setDate(today.getDate() + 14);
        return isMatchingSearch && eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
      }
      return isMatchingSearch; // No date filtering for 'All'
    });
  }, [events, search, sortOption]);

  const handleEquipmentClick = (eventId) => {
    navigate('/equipment', { state: { eventId } });
  };
  
  const handleInventoryClick = (eventId) => {
    navigate('/inventory', { state: { eventId } });
};

const handleGuestClick = (eventId) => {
  navigate('/group-attendees', { state: { eventId } });
};


  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const toggleMenu = (eventId) => {
    setShowMenu((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const renderEventItem = (item) => {
    // Use the cover photo URL from the item directly
    const coverPhotoUrl = item.cover_photo; // Assuming your API response has a `cover_photo` field

    return (
        <div key={item.id} className="item-container-events">
            {/* Display the cover photo stored in the database */}
            <img src={coverPhotoUrl} alt={item.name} className="image-events" />
            <h3 className="title-events">{item.name}</h3>
            <div className="detail-container-events">
                <div className="detail-row-events">
                    <FontAwesomeIcon icon={faCalendar} size="lg" color="#2A93D5" />
                    <span className="detail-text-events">{item.date}</span>
                </div>
                <div className="detail-row-events">
                    <FontAwesomeIcon icon={faMapMarker} size="lg" color="#2A93D5" />
                    <span className="detail-text-events">{item.venue}</span>
                </div>
            </div>
            <button
                className={`heart-icon-events ${likedEvents[item.id] ? 'heart-liked-events' : ''}`}
                onClick={() => toggleLike(item.id)}
            >
                <FontAwesomeIcon icon={faHeart} size="lg" />
            </button>

            {/* Three Dots Menu for each event */}
            <div className="dots-container-events" onClick={() => toggleMenu(item.id)}>
                <FontAwesomeIcon icon={faEllipsisV} size="lg" />
            </div>
            {showMenu[item.id] && (
                <div className="menu-overlay-events">
                    <div className="menu-item-events" onClick={() => navigate('/attendees')}>
                        <FontAwesomeIcon icon={faUser} /> Attendee
                    </div>
                    <div className="menu-item-events" onClick={() => handleInventoryClick(item.id)}>
                        <FontAwesomeIcon icon={faBox} /> Inventory
                    </div>
                    <div className="menu-item-events" onClick={() => handleEquipmentClick(item.id)}>
                        <FontAwesomeIcon icon={faBox} /> Equipment
                    </div>
                    <div className="menu-item-events" onClick={() => navigate('/feedback/feedback-events')}>
                        <FontAwesomeIcon icon={faCommentDots} /> Feedback
                    </div>
                    <div className="menu-item-events" onClick={() => handleGuestClick(item.id)}>
                        <FontAwesomeIcon icon={faUserFriends} /> Guest
                    </div>
                </div>
            )}
        </div>
    );
};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gradient-container-events">
      <div className="container-events">
        <div className="search-container-events">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon-events" />
          <input
            type="text"
            className="search-box-events"
            placeholder="Search Event"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="dropdown-container-events">
            <button className="dropdown-btn-events">
              Sort by: {sortOption} <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="dropdown-content-events">
              <div onClick={() => filterEventsByDate('All')}>All</div>
              <div onClick={() => filterEventsByDate('This Week')}>This Week</div>
              <div onClick={() => filterEventsByDate('Next Week')}>Next Week</div>
            </div>
          </div>
        </div>
        <div className="event-list-events">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>
    </div>
  );
}

export default Events;
