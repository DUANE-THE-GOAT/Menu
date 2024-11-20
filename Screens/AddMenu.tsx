import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { useNavigate } from 'react-router-native';
import { MenuItem } from '../types/types';

interface AddMenuProps {
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  menuItems: MenuItem[];
}

export default function AddMenu({ setMenuItems, menuItems }: AddMenuProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters'); // Default to Starters
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleAddMenuItem = () => {
    // Basic validation
    if (!dishName || !description || !price) {
      Alert.alert("All fields are required.");
      return;
    }
    if (Number(price) <= 0) {
      Alert.alert("Price must be a positive number.");
      return;
    }

    const newItem: MenuItem = {
      dishName,
      description,
      course,
      price: Number(price),
    };

    setMenuItems([...menuItems, newItem]);

    // Clear input fields after adding the item
    setDishName('');
    setDescription('');
    setCourse('Starters'); // Reset to default value
    setPrice('');

    // Navigate to the view page to see the menu items
    navigate('/view');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Picker for predefined course list */}
      <Picker
        selectedValue={course}
        style={styles.picker} // Use picker style
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
        <Picker.Item label="Drinks" value="Drinks" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Button title="Add Menu Item" onPress={handleAddMenuItem} />

      {/* Button to view menu items */}
      <Button title="View Menu Items" onPress={() => navigate('/view')} />

      {/* Button to go back to the home page */}
      <Button title="Go Back" onPress={() => navigate('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
});
