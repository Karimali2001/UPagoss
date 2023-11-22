import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Queries = () => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDateSelect = (event, selectedDate) => {
    if (selectedDate === undefined) {
      // User dismissed the date picker
      setShowDatePicker(false);
      return;
    }

    setDate(selectedDate);
    setShowDatePicker(false);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleButtonClick = () => {
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      navigation.navigate('Payments', {
        data: formattedDate,
      });
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeAllImageUris = async () => {
    try {
      const currentPayments = await AsyncStorage.getItem('payments');
      if (currentPayments !== null) {
        const parsedPayments = JSON.parse(currentPayments);
        const updatedPayments = parsedPayments.map((payment) => {
          const { imageUri, ...paymentWithoutImage } = payment;
          return paymentWithoutImage;
        });
        await AsyncStorage.setItem('payments', JSON.stringify(updatedPayments));
      }
    } catch (error) {
      console.error('Error removing all image URIs from payments:', error);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmationModal(false);
    removeAllImageUris();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>
          Consulta {'\n'}
          de Pagos {'\n'}
          por Fecha
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.dateInput} onPress={showDatepicker}>
          <Text>{date.toLocaleDateString('es-ES') || 'Ingrese la fecha'}</Text>
          <Ionicons name="calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDateSelect}
        />
      )}

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Por favor, ingrese la fecha antes de consultar.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

  
        <TouchableOpacity style={styles.submitButton} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Consultar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleConfirmation}>
          <Text style={styles.buttonText}>Borrar imagenes hasta la fecha</Text>
        </TouchableOpacity>

      <Modal visible={showConfirmationModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Está seguro de borrar todas las imágenes?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancelDelete}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalDeleteButton} onPress={handleDeleteConfirmation}>
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363062',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    height: 40,
    marginBottom: 10,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    color: '#F99417',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingTop: 0,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#F99417',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#F99417',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginTop: 250,
    alignItems: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalCancelButton: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  modalDeleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
});

export default Queries;
