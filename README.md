# Live-AUC

const ReserveSlot = ({ slots, onUpdateSlots }) => {
  const handleSlotReservation = (slotId) => {
    const selectedSlot = slots.find((slot) => slot.id === slotId);

    if (!selectedSlot) {
      Alert.alert("Error", "Slot not found.");
      return;
    }
    if (selectedSlot.isFullyBooked) {
      Alert.alert("Slot Fully Booked", "This slot is fully booked. Please choose another slot.");
    } else {
      // Simulate a successful reservation by updating slot status
      const updatedSlots = slots.map((slot) =>
        slot.id === slotId ? { ...slot, isFullyBooked: true } : slot
      );
      onUpdateSlots(updatedSlots); 

      Alert.alert("Success", "You have successfully reserved this slot!");
    }
  };
  return (
    <View style={styles.container}>
      {slots.map((slot) => (
        <View key={slot.id} style={styles.slotContainer}>
          <Text style={styles.slotText}>
            {slot.time} - {slot.isFullyBooked ? "Fully Booked" : "Available"}
          </Text>
          <Button
            title="Reserve"
            onPress={() => handleSlotReservation(slot.id)}
            disabled={slot.isFullyBooked}
          />
        </View>
      ))}
    </View>
  );
};

export default ReserveSlot;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  slotContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  slotText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
