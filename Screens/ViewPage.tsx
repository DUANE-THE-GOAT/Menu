import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native'; // Import useNavigate for navigation
import { Picker } from '@react-native-picker/picker'; // Import Picker for selecting courses
import { MenuItem } from '../types/types'; // Import the MenuItem interface

interface ViewPageProps {
    menuItems: MenuItem[];
}

export default function ViewPage({ menuItems }: ViewPageProps) {
    const navigate = useNavigate(); // Initialize navigation
    const [selectedCourse, setSelectedCourse] = useState('All'); // State to hold the selected course

    // Filter menu items based on the selected course
    const filteredMenuItems = selectedCourse === 'All'
        ? menuItems
        : menuItems.filter(item => item.course === selectedCourse);

    // Calculate the average price of the filtered items
    const averagePrice =
        filteredMenuItems.length > 0
            ? filteredMenuItems.reduce((total, item) => total + item.price, 0) / filteredMenuItems.length
            : 0;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu Items</Text>

            {/* Picker for selecting a course */}
            <Picker
                selectedValue={selectedCourse}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCourse(itemValue)}
            >
                <Picker.Item label="All Courses" value="All" />
                <Picker.Item label="Starters" value="Starters" />
                <Picker.Item label="Mains" value="Mains" />
                <Picker.Item label="Desserts" value="Desserts" />
                <Picker.Item label="Drinks" value="Drinks" />
            </Picker>

            {/* Display the average price */}
            <Text style={styles.averagePrice}>
                Average Price: R{averagePrice.toFixed(2)}
            </Text>

            {/* List of menu items based on selected course */}
            {filteredMenuItems.length > 0 ? (
                <FlatList
                    data={filteredMenuItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.dishName}</Text>
                            <Text>Description: {item.description}</Text>
                            <Text>Course: {item.course}</Text>
                            <Text>Price: R{item.price.toFixed(2)}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noItems}>No items available for this course.</Text>
            )}

            {/* "Go Back" Button to navigate to the home page */}
            <Button title="Go Back" onPress={() => navigate('/')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        marginBottom: 20,
    },
    averagePrice: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noItems: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});
