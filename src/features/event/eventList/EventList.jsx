import React, { Component } from "react";
import EventItem from "./EventItem";
import InfinitScroll from "react-infinite-scroller";

class EventList extends Component {
  render() {
    const { events, loading, moreEvents, getNextEvents } = this.props;
    return (
      <div>
        {events && events.length !== 0 && (
          <InfinitScroll
            pageStart={0}
            loadMore={getNextEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {events &&
              events.map(event => (
                <EventItem
                  key={event.id}
                  event={event}
                
                />
              ))}
          </InfinitScroll>
        )}
      </div>
    );
  }
}

export default EventList;
