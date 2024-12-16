import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "../../adminMain/styles/styles";
import { useEventStoreServiceProvider } from "../../../stateManagement/serviceProvider/useEventStoreServiceProvider";
import { fetchEvents } from "../../../services/organizer/adminEventServices";
import { ScrollView } from "react-native-gesture-handler";
import { getEventsWithMyServices } from "../../../services/serviceProvider/serviceProviderServices";
const ScheduleScreen = ({ refreshing, onRefresh }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const { currentEvents, setCurrentEvents } = useEventStoreServiceProvider();

  // Fetch events and store them in Zustand state
  const getEvents = async () => {
    try {
      const events = await getEventsWithMyServices();
      setCurrentEvents(events); // Update Zustand state
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events on mount and whenever the parent triggers a refresh
  useEffect(() => {
    getEvents();
  }, [refreshing]);

  useEffect(() => {
    const newMarkedDates = {};
    currentEvents
      .filter((event) => event.status !== "declined")
      .forEach((event) => {
        const eventDate = event.date;

        if (!newMarkedDates[eventDate]) {
          newMarkedDates[eventDate] = { dots: [] };
        }

        newMarkedDates[eventDate].dots.push({
          color: "#eeba2b",
        });
      });

    setMarkedDates(newMarkedDates);
  }, [currentEvents]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const eventsForSelectedDate = currentEvents.filter(
    (event) => event.date === selectedDate && event.status !== "declined"
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Optional: hides the scrollbar
      >
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              dots: markedDates[selectedDate]?.dots || [],
              selectedColor: "blue",
            },
          }}
          markingType="multi-dot"
          theme={{
            selectedDayBackgroundColor: "blue",
            todayTextColor: "red",
            arrowColor: "blue",
          }}
        />

        <View style={styles.agendaContainer}>
          <Text style={styles.selectedDateText}>
            {selectedDate || "Select a date to view schedules"}
          </Text>

          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventContainer}
                onPress={() => console.log("Event Pressed:", event)}
              >
                <Text style={styles.eventTitle}>{event.name}</Text>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Time: </Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Location: </Text>
                  <Text style={styles.eventDescription}>
                    {event.location || "No location specified"}
                  </Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Description: </Text>
                  <Text style={styles.eventDescription}>
                    {event.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noEventsText}>No events for this date.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleScreen;