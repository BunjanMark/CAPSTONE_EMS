import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TextInput } from "react-native-gesture-handler";

const StepThree = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
  nextStep,
  prevStep,
  submitForm,
  currentPackages,
  selected,
  setSelected,
  renderItem,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPackageDetails, setCurrentPackageDetails] = useState(null);
  const [customizeVisible, setCustomizeVisible] = useState(false);

  const packageData = (currentPackages || [])
    .filter((pkg) => pkg.packageName && pkg.id)
    .map((pkg) => ({
      label: pkg.packageName,
      id: pkg.id,
      totalPrice: pkg.totalPrice,
      packageType: pkg.packageType,
      value: pkg.id,
      coverPhoto: pkg.coverPhotoUrl,
      category: pkg.eventType,
      inclusions: pkg.services.map((service, index) => service.serviceName),
    }));

  const handleSelectionChange = (items) => {
    setSelected(items);
    setFieldValue(
      "currentPackages",
      items.map((item) => item.value) // Update Formik's field with selected package IDs
    );
    console.log("Selected packages:", items);
  };

  const showPackageDetails = (pkg) => {
    setCurrentPackageDetails(pkg);
    setModalVisible(true);
  };
  const [customInclusions, setCustomInclusions] = useState([]); // To track current custom inclusions
  const [newInclusion, setNewInclusion] = useState(""); // To handle input for new inclusion

  const handleAddInclusion = () => {
    if (newInclusion.trim()) {
      setCustomInclusions([...customInclusions, newInclusion]);
      setNewInclusion(""); // Clear input field
    }
  };

  const handleRemoveInclusion = (index) => {
    const updatedInclusions = customInclusions.filter((_, i) => i !== index);
    setCustomInclusions(updatedInclusions);
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={packageData}
        labelField="label"
        valueField="value"
        placeholder="Select packages"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={handleSelectionChange}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <View style={styles.selectedItemContainer}>
            <View style={styles.selectedItem}>
              <Text style={styles.selectedText}>{item.label}</Text>
              <TouchableOpacity onPress={() => showPackageDetails(item)}>
                <AntDesign
                  color="black"
                  name="eye"
                  size={20}
                  style={styles.iconSpacing}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <AntDesign color="black" name="delete" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* Modal for package details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Package Details: {currentPackageDetails?.label || "Package Name"}
            </Text>
            <Text style={styles.modalText}>
              Package price: {currentPackageDetails?.totalPrice || "N/A"}
            </Text>
            <Text style={styles.modalText}>
              Package type: {currentPackageDetails?.category || "N/A"}
            </Text>
            <Text style={styles.modalText}>
              Package inclusions:
              {currentPackageDetails?.inclusions.map((item, index) => (
                <Text key={index} style={styles.inclusionItem}>
                  {"\n"}• {item}
                </Text>
              ))}
            </Text>

            {/* Customize Package Button */}
            <Pressable
              style={styles.customizeButton}
              onPress={() => {
                setCustomizeVisible(true);
                setModalVisible(false); // Hide current modal
              }}
            >
              <Text style={styles.customizeButtonText}>Customize Package</Text>
            </Pressable>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal for customizing package */}
      // Inside Customize Package Modal
      <Modal
        visible={customizeVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCustomizeVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Customize Package:{" "}
              {currentPackageDetails?.label || "Package Name"}
            </Text>

            {/* Current inclusions */}
            <Text style={styles.modalText}>Current Inclusions:</Text>
            {customInclusions.length > 0 ? (
              customInclusions.map((inclusion, index) => (
                <View key={index} style={styles.inclusionRow}>
                  <Text style={styles.inclusionItem}>{inclusion}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveInclusion(index)}
                  >
                    <AntDesign name="delete" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.modalText}>No inclusions added yet.</Text>
            )}

            {/* Add new inclusion */}
            <Text style={styles.modalText}>Add New Inclusion:</Text>
            <View style={styles.addInclusionContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter inclusion name"
                value={newInclusion}
                onChangeText={setNewInclusion}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddInclusion}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Save and close buttons */}
            <Pressable
              style={styles.saveButton}
              onPress={() => {
                // Update the parent package details with the custom inclusions
                setCurrentPackageDetails({
                  ...currentPackageDetails,
                  inclusions: customInclusions,
                });
                setCustomizeVisible(false); // Close customize modal
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
            <Pressable
              style={styles.closeButton}
              onPress={() => setCustomizeVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonRow}>
        <Button onPress={prevStep} style={styles.button} mode="contained">
          Back
        </Button>
        <Button onPress={nextStep} style={styles.button} mode="contained">
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  placeholderStyle: {
    color: "#999",
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  inclusionItem: {
    fontSize: 14,
  },
  customizeButton: {
    backgroundColor: "green",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  customizeButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 0.45,
  },
});
