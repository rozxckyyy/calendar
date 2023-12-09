import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CalendarApp = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const isCurrentDay = (year, month, day) => {
    const currentDate = new Date();
    return year === currentDate.getFullYear() && month === currentDate.getMonth() + 1 && day === currentDate.getDate();
  };

  const changeYear = (amount) => {
    setYear(year + amount);
  };

  const changeMonth = (amount) => {
    const newMonth = month + amount;

    if (newMonth < 1) {
      setYear(year - 1);
      setMonth(12);
    } else if (newMonth > 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(newMonth);
    }
  };

  const goToCurrentMonth = () => {
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth() + 1);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = new Date(year, month - 1, 1).getDay();

    let calendarDays = [];

    for (let i = 0; i < firstDayIndex; i++) {
      calendarDays.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <TouchableOpacity key={day} style={[styles.calendarCell, isCurrentDay(year, month, day) && styles.currentDay]}>
          <Text style={[styles.calendarDayText, isCurrentDay(year, month, day) && styles.currentDayText]}>{day}</Text>
        </TouchableOpacity>
      );
    }

    return calendarDays;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeYear(-1)}>
          <MaterialIcons name="chevron-left" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.yearText}>{year}</Text>
        <TouchableOpacity onPress={() => changeYear(1)}>
          <MaterialIcons name="chevron-right" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{month}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToCurrentMonth} style={styles.currentMonthButton}>
          <Text style={styles.currentMonthButtonText}>Текущий месяц</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>{renderCalendar()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  yearText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  currentMonthButton: {
    marginLeft: 'auto',
  },
  currentMonthButtonText: {
    fontSize: 16,
    color: 'orange',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  calendarCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4343',
    borderRadius: 100,
    margin: 4
  },
  emptyCell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    margin: 4
  },
  currentDay: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  currentDayText: {
    color: 'white'
  },
  calendarDayText: {
    fontSize: 16,
  },
});

export default CalendarApp