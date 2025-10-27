import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SectionTaskScreen = ({ navigation }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAddWork, setShowAddWork] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [audience] = useState('Public');
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ TASK DATA
  const tasks = [
    {
      id: 1,
      title: 'Proper Warm-up Routine',
      week: 'Week 1: Sept 1 Activity',
      description:
        'Create a 2-minute video performing a proper warm-up routine that includes jogging in place, arm circles, and leg swings.',
      instruction:
        'Make sure your video is clear and demonstrates the correct form. Submit your work before the deadline.',
      deadline: 'Due: Sept 10, 2025 - 11:59 PM',
      submitted: true,
    },
    {
      id: 2,
      title: 'Dance Challenge',
      week: 'Week 1: Sept 1 Activity',
      description:
        'Create a 1-minute dance video to show your rhythm and creativity.',
      instruction:
        'You can perform solo or with a group. Make sure your performance is appropriate and energetic.',
      deadline: 'Due: Sept 10, 2025 - 11:59 PM',
      submitted: false,
    },
  ];

  // ✅ Filter tasks based on search
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ FEEDBACK DATA
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      activity: 'Proper Warm-up Routine',
      feedback:
        'Excellent performance! Your form was good and consistent throughout the video. Keep it up!',
      read: false,
    },
    {
      id: 2,
      activity: 'Dance Challenge',
      feedback:
        'Your energy is great, but make sure to work on timing and coordination with the beat.',
      read: false,
    },
  ]);

  // FUNCTIONS
  const openTask = (task) => {
    setSelectedTask(task);
    setShowResult(false);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setShowResult(false);
  };

  const handleViewSubmission = () => {
    setShowResult(true);
  };

  const openFeedback = () => setShowFeedback(true);
  const closeFeedback = () => setShowFeedback(false);
  const openAddWork = () => setShowAddWork(true);
  const closeAddWork = () => setShowAddWork(false);

  const handleMarkAsRead = (id) => {
    setFeedbacks((prev) =>
      prev.map((fb) => (fb.id === id ? { ...fb, read: true } : fb))
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        {/* 🔙 Back Arrow */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.logoText}>PATHFIT</Text>

        {/* Instructor Feedback */}
        <TouchableOpacity onPress={openFeedback}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#666" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={{ flex: 1 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* TASK LIST */}
      <ScrollView style={{ marginTop: 15 }}>
        <Text style={styles.weekText}>Week 1: Sept 1 and 5 Activity</Text>

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => openTask(task)}
            >
              <View>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDue}>{task.deadline}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ff6a00" />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
            No matching tasks found.
          </Text>
        )}
      </ScrollView>

      {/* TASK MODAL */}
      <Modal visible={!!selectedTask} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            {!showResult ? (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close" size={22} color="#333" />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalSubtitle}>
                    Activity {selectedTask?.id}: {selectedTask?.title}
                  </Text>

                  <Text style={styles.modalLabel}>Description:</Text>
                  <Text style={styles.modalText}>{selectedTask?.description}</Text>

                  <Text style={[styles.modalLabel, { marginTop: 10 }]}>
                    Instruction:
                  </Text>
                  <Text style={styles.modalText}>{selectedTask?.instruction}</Text>

                  <Text style={styles.deadlineText}>{selectedTask?.deadline}</Text>
                </ScrollView>

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.orangeBtn} onPress={openAddWork}>
                    <Text style={styles.btnText}>Add Work</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.grayBtn} onPress={handleViewSubmission}>
                    <Text style={styles.btnText}>View Submission</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.resultContainer}>
                {selectedTask?.submitted ? (
                  <>
                    <Ionicons name="checkmark-circle-outline" size={70} color="#2ecc71" />
                    <Text style={styles.successTitle}>Success</Text>
                    <Text style={styles.resultText}>
                      You have successfully submitted your {selectedTask?.title}.
                    </Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="close-circle-outline" size={70} color="#e74c3c" />
                    <Text style={styles.failTitle}>Oh no</Text>
                    <Text style={styles.resultText}>
                      You haven’t submitted yet your {selectedTask?.title}.
                    </Text>
                  </>
                )}
                <TouchableOpacity style={styles.orangeBtn} onPress={closeModal}>
                  <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* ADD WORK MODAL */}
      <Modal visible={showAddWork} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={[styles.modalCard, { height: '85%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Work</Text>
              <TouchableOpacity onPress={closeAddWork}>
                <Ionicons name="close" size={22} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Ionicons name="person-circle-outline" size={40} color="#ff6a00" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>Ejine Mangcobihon</Text>
                  <TouchableOpacity onPress={() => setShowAudienceModal(true)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="earth-outline" size={14} color="#666" />
                      <Text style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>
                        {audience}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 8,
                  height: 120,
                  marginTop: 15,
                  padding: 10,
                }}
              >
                <Text style={{ color: '#999' }}>Add Activity</Text>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}
              >
                <Ionicons name="image-outline" size={22} color="#ff6a00" />
                <Text style={{ marginLeft: 8, color: '#333' }}>Photos/Videos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.orangeBtn, { marginTop: 25, alignSelf: 'center', width: '100%' }]}
                onPress={closeAddWork}
              >
                <Text style={styles.btnText}>POST</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* CHOOSE AUDIENCE (UI ONLY) */}
      <Modal visible={showAudienceModal} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={[styles.modalCard, { height: '70%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Audience</Text>
              <TouchableOpacity onPress={() => setShowAudienceModal(false)}>
                <Ionicons name="close" size={22} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 13, color: '#666', marginTop: 10 }}>
              Who can see your post? This is a sample interface only.
            </Text>

            {['Public', 'Section Only', 'Private'].map((item) => (
              <View
                key={item}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 12,
                }}
              >
                <Ionicons
                  name={item === 'Public' ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color="#ff6a00"
                />
                <Text style={{ marginLeft: 10, fontSize: 14 }}>{item}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.orangeBtn, { marginTop: 25, width: '100%' }]}
              onPress={() => setShowAudienceModal(false)}
            >
              <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 📋 INSTRUCTOR FEEDBACK MODAL */}
      <Modal visible={showFeedback} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={[styles.modalCard, { height: '75%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Instructor Feedback</Text>
              <TouchableOpacity onPress={closeFeedback}>
                <Ionicons name="close" size={22} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ marginTop: 10 }}>
              {feedbacks.map((fb) => (
                <View
                  key={fb.id}
                  style={[
                    styles.feedbackCard,
                    fb.read && { backgroundColor: '#f0f0f0' },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.feedbackActivity}>{fb.activity}</Text>
                    {fb.read && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#2ecc71"
                        style={{ marginLeft: 5 }}
                      />
                    )}
                  </View>

                  <Text style={styles.feedbackText}>{fb.feedback}</Text>

                  {!fb.read && (
                    <TouchableOpacity
                      style={styles.markReadBtn}
                      onPress={() => handleMarkAsRead(fb.id)}
                    >
                      <Ionicons name="checkmark" size={16} color="#fff" />
                      <Text style={styles.markReadText}>Mark as Read</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SectionTaskScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20, 
    paddingTop: 40 },

  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' },

  logoText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#ff6a00', 
    fontFamily: 'monospace' },

  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f3f3f3', 
    padding: 8, 
    borderRadius: 8, 
    marginTop: 15 },

  weekText: { 
    fontSize: 13, 
    color: '#444', 
    marginBottom: 10 },

  taskCard: { 
    backgroundColor: '#fff', 
    padding: 12, borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#eee', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 },

  taskTitle: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#333' },

  taskDue: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 3 },

  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center', 
    alignItems: 'center' },

  modalCard: { 
    width: '85%', 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 20, 
    elevation: 6 },

  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' },

  modalTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' },

  modalSubtitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginVertical: 10 },

  modalLabel: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#222' },

  modalText: { 
    fontSize: 13, 
    color: '#555', 
    marginTop: 3, 
    lineHeight: 18 },

  deadlineText: { 
    fontSize: 12, 
    color: '#999', 
    textAlign: 'right', 
    marginTop: 15 },

  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20 },

  orangeBtn: { 
    backgroundColor: '#ff6a00', 
    paddingVertical: 10, 
    borderRadius: 6, width: '48%', 
    alignItems: 'center' },

  grayBtn: { 
    backgroundColor: '#ccc', 
    paddingVertical: 10, 
    borderRadius: 6, 
    width: '48%', 
    alignItems: 'center' },

  btnText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 13 },

  resultContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 30 },

  successTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2ecc71', 
    marginVertical: 10 },

  failTitle: {
     fontSize: 24, 
     fontWeight: 'bold', 
     color: '#e74c3c', 
     marginVertical: 10 },
  resultText: { 
    fontSize: 14, 
    textAlign: 'center', 
    color: '#444', 
    marginBottom: 20, 
    paddingHorizontal: 10 },

  feedbackCard: { 
    backgroundColor: '#f9f9f9', 
    padding: 12, borderRadius: 8, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#eee' },

  feedbackActivity: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#333' },

  feedbackText: { 
    fontSize: 13, 
    color: '#555', 
    marginTop: 4 },
    
  markReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6a00',
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
  },
  markReadText: { color: '#fff', fontSize: 12, marginLeft: 5 },
});
