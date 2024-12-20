// Screens/HomePage.tsx
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigate } from 'react-router-native';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Menu App</Text>
            <Button title="Add Menu Item Here" onPress={() => navigate('/add')} />
            <Button title="View Menu Items Here" onPress={() => navigate('/view')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill the entire screen
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f8ff', // Light blue background
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        fontWeight: 'bold',
        color: '#4b0082', // Indigo text
    },
});
