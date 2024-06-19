import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChakraProvider,
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Input,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

const Table = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newStudent, setNewStudent] = useState({ name: '', rollNo: '', description: '', age: '' });
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await axios.get('http://localhost:3001/students');
        setStudents(response.data);
    };

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:3001/students/${id}`);
        fetchStudents();
    };

    const handleEditOpen = (student) => {
        setEditingStudent(student);
        onEditOpen();
    };

    const handleEditClose = () => {
        onEditClose();
        setEditingStudent(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingStudent({
            ...editingStudent,
            [name]: value,
        });
    };

    const updateStudent = async () => {
        await axios.put(`http://localhost:3001/students/${editingStudent._id}`, editingStudent);
        handleEditClose();
        fetchStudents();
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({
            ...newStudent,
            [name]: value,
        });
    };

    const addStudent = async () => {
        await axios.post('http://localhost:3001/students', newStudent);
        setNewStudent({ name: '', rollNo: '', description: '', age: '' });
        onAddClose();
        fetchStudents();
    };

    return (
        <ChakraProvider>
            <Box p={4}>
                <h1>To do list</h1>
                <Button colorScheme="teal" onClick={onAddOpen} mb={4}>
                    Add Student
                </Button>
                <ChakraTable  >
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Roll No</Th>
                            <Th>Description</Th>
                            <Th>Age</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {students.map((student) => (
                            <Tr key={student._id}>
                                <Td>{student.name}</Td>
                                <Td>{student.rollNo}</Td>
                                <Td>{student.description}</Td>
                                <Td>{student.age}</Td>
                                <Td>
                                    <Button colorScheme="purple" onClick={() => handleEditOpen(student)} mr={2}>
                                        Edit
                                    </Button>
                                    <Button colorScheme="red" onClick={() => deleteStudent(student._id)} mr={2}>
                                        Delete
                                    </Button>
                                    <Button colorScheme="yellow" onClick={() => alert(JSON.stringify(student))}>View</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </ChakraTable>

 
                {/* Edit Student Modal */}
                {editingStudent && (
                    <Modal isOpen={isEditOpen} onClose={handleEditClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit Student</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input
                                    placeholder="Name"
                                    name="name"
                                    value={editingStudent.name}
                                    onChange={handleEditChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder="Roll No"
                                    name="rollNo"
                                    value={editingStudent.rollNo}
                                    onChange={handleEditChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder="Description"
                                    name="description"
                                    value={editingStudent.description}
                                    onChange={handleEditChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder="Age"
                                    name="age"
                                    type="number"
                                    value={editingStudent.age}
                                    onChange={handleEditChange}
                                    mb={3}
                                />
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={updateStudent}>
                                    Update
                                </Button>
                                <Button onClick={handleEditClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}

                

                
                <Modal isOpen={isAddOpen} onClose={onAddClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Student</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Name"
                                name="name"
                                value={newStudent.name}
                                onChange={handleAddChange}
                                mb={3}
                            />
                            <Input
                                placeholder="Roll No"
                                name="rollNo"
                                value={newStudent.rollNo}
                                onChange={handleAddChange}
                                mb={3}
                            />
                            <Input
                                placeholder="Description"
                                name="description"
                                value={newStudent.description}
                                onChange={handleAddChange}
                                mb={3}
                            />
                            <Input
                                placeholder="Age"
                                name="age"
                                type="number"
                                value={newStudent.age}
                                onChange={handleAddChange}
                                mb={3}
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="teal" mr={3} onClick={addStudent}>
                                Add
                            </Button>
                            <Button onClick={onAddClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                
            </Box>
         </ChakraProvider>
    );
};

export default Table;
