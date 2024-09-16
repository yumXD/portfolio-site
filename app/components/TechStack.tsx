'use client'

import {useState} from 'react';
import {Box, Button, Divider, Grid, GridItem, HStack, Input, Select, Text, VStack} from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa'; // Fa icons
import * as SiIcons from 'react-icons/si'; // Si icons
import * as DiIcons from 'react-icons/di'; // Di icons

// 모든 아이콘 라이브러리를 미리 import한 후 아이콘을 매칭하는 함수
const getIconComponent = (iconName: string) => {
    if (iconName.startsWith('Fa')) {
        return FaIcons[iconName as keyof typeof FaIcons] || null;
    } else if (iconName.startsWith('Si')) {
        return SiIcons[iconName as keyof typeof SiIcons] || null;
    } else if (iconName.startsWith('Di')) {
        return DiIcons[iconName as keyof typeof DiIcons] || null;
    }
    return null;
};

interface TechItem {
    id?: number;
    name: string;
    icon: string;
    color: string;
}

interface TechStackProps {
    techStacks: {
        id: number;
        name: string;
        items: TechItem[];
    }[];
}

export default function TechStackComponent({techStacks: initialData}: TechStackProps) {
    const [techStacks, setTechStacks] = useState(initialData);
    const [newItem, setNewItem] = useState({name: '', icon: '', color: ''});
    const [newStack, setNewStack] = useState({name: '', items: [{name: '', icon: '', color: ''}]});
    const [showNewStackForm, setShowNewStackForm] = useState(false); // 새로운 스택 입력 폼 표시 여부
    const [showNewItemForm, setShowNewItemForm] = useState<number | null>(null); // 기존 스택에 아이템 추가 폼 표시 여부

    // 토글 방식으로 새로운 스택 입력 폼을 보여줌
    const toggleNewStackForm = () => {
        setShowNewStackForm((prev) => !prev);
    };

    // 토글 방식으로 새로운 아이템 입력 폼을 특정 스택에 보여줌
    const toggleNewItemForm = (stackId: number) => {
        if (showNewItemForm === stackId) {
            setShowNewItemForm(null); // 이미 열려 있으면 닫기
        } else {
            setShowNewItemForm(stackId); // 해당 스택에 열기
        }
    };

    // 기존 기술 스택에 아이템 추가
    const addItemToStack = async (stackId: number) => {
        const stackToUpdate = techStacks.find((stack) => stack.id === stackId);
        if (!stackToUpdate) return;

        const updatedItems = [...stackToUpdate.items, newItem]; // 기존 아이템에 새 아이템 추가

        const response = await fetch('/api/tech-stack', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: stackId,
                name: stackToUpdate.name,
                items: updatedItems, // 수정된 아이템 목록을 서버로 전송
            }),
        });

        if (response.ok) {
            const updatedStackData = await response.json();
            setTechStacks(
                techStacks.map((stack) =>
                    stack.id === stackId ? updatedStackData : stack
                )
            );
            setNewItem({name: '', icon: '', color: ''}); // 입력값 초기화
            setShowNewItemForm(null); // 입력 폼 닫기

            window.location.reload(); // 강제 새로고침
        } else {
            console.error('Failed to add item to stack');
        }
    };

    // 새로운 기술 스택 생성 함수
    const createNewStack = async () => {
        const response = await fetch('/api/tech-stack', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newStack), // 새로운 스택 데이터를 서버로 전송
        });

        if (response.ok) {
            const newTechStack = await response.json();
            setTechStacks([...techStacks, newTechStack]); // 새로 추가된 스택을 리스트에 추가
            setNewStack({name: '', items: [{name: '', icon: '', color: ''}]}); // 입력값 초기화
            setShowNewStackForm(false); // 폼 닫기

            window.location.reload(); // 강제 새로고침
        } else {
            console.error('Failed to create new stack');
        }
    };

    // 스택 삭제
    const deleteTechStack = async (stackId: number) => {
        const response = await fetch('/api/tech-stack', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: stackId}),
        });

        if (response.ok) {
            setTechStacks(techStacks.filter((stack) => stack.id !== stackId));

            window.location.reload(); // 강제 새로고침
        } else {
            console.error('Failed to delete stack');
        }
    };

    // 아이템 삭제
    const deleteTechItem = async (stackId: number, itemId: number) => {
        const stackToUpdate = techStacks.find((stack) => stack.id === stackId);
        if (!stackToUpdate) return;

        const updatedItems = stackToUpdate.items.filter((item) => item.id !== itemId);

        const response = await fetch('/api/tech-stack', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: stackId,
                name: stackToUpdate.name,
                items: updatedItems,
            }),
        });

        if (response.ok) {
            const updatedStackData = await response.json();
            setTechStacks(
                techStacks.map((stack) =>
                    stack.id === stackId ? updatedStackData : stack
                )
            );

            window.location.reload(); // 강제 새로고침
        } else {
            console.error('Failed to delete item');
        }
    };

    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%"
             mx="auto" minWidth="300px">
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                기술 스택
            </Text>
            <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>

            {/* 새로운 스택 추가 섹션 */}
            <Button colorScheme="blue" onClick={toggleNewStackForm}>
                {showNewStackForm ? '새로운 스택 닫기' : '새로운 스택 추가'}
            </Button>
            {showNewStackForm && (
                <VStack spacing={4} align="start" mt={4}>
                    <Text fontSize="xl" fontWeight="semibold">새로운 기술 스택 추가</Text>
                    <Input
                        placeholder="Stack 이름"
                        value={newStack.name}
                        onChange={(e) => setNewStack({...newStack, name: e.target.value})}
                    />
                    {newStack.items.map((item, index) => (
                        <HStack key={index}>
                            <Input
                                placeholder="기술 이름"
                                value={item.name}
                                onChange={(e) => {
                                    const updatedItems = newStack.items.map((i, iIndex) =>
                                        iIndex === index ? {...i, name: e.target.value} : i
                                    );
                                    setNewStack({...newStack, items: updatedItems});
                                }}
                            />
                            <Select
                                placeholder="아이콘 선택"
                                value={item.icon}
                                onChange={(e) => {
                                    const updatedItems = newStack.items.map((i, iIndex) =>
                                        iIndex === index ? {...i, icon: e.target.value} : i
                                    );
                                    setNewStack({...newStack, items: updatedItems});
                                }}
                            >
                                {Object.keys(FaIcons)
                                    .concat(Object.keys(SiIcons), Object.keys(DiIcons))
                                    .map((iconKey) => (
                                        <option key={iconKey} value={iconKey}>
                                            {iconKey}
                                        </option>
                                    ))}
                            </Select>
                            <Input
                                placeholder="색상 (hex)"
                                value={item.color}
                                onChange={(e) => {
                                    const updatedItems = newStack.items.map((i, iIndex) =>
                                        iIndex === index ? {...i, color: e.target.value} : i
                                    );
                                    setNewStack({...newStack, items: updatedItems});
                                }}
                            />
                        </HStack>
                    ))}
                    <Button colorScheme="green" onClick={createNewStack}>
                        새로운 스택 생성
                    </Button>
                </VStack>
            )}

            {/* 기존 스택 목록 */}
            <Grid mt={6} templateColumns={{base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)'}} gap={6}>
                {techStacks.map((stack) => (
                    <GridItem key={stack.id}>
                        <VStack align="start">
                            <Text fontSize="xl" fontWeight="semibold">{stack.name}</Text>
                            <VStack spacing={2} align="start">
                                {stack.items.map((item) => {
                                    const IconComponent = getIconComponent(item.icon);
                                    return (
                                        <HStack spacing={2} key={item.id}>
                                            {IconComponent && <IconComponent size="24px" color={item.color}/>}
                                            <Text>{item.name}</Text>
                                            <Button colorScheme="red" size="sm"
                                                    onClick={() => deleteTechItem(stack.id, item.id!)}>
                                                아이템 삭제
                                            </Button>
                                        </HStack>
                                    );
                                })}
                            </VStack>

                            {/* 새로운 아이템 추가 버튼 */}
                            <Button colorScheme="blue" onClick={() => toggleNewItemForm(stack.id)}>
                                {showNewItemForm === stack.id ? '아이템 추가 닫기' : '아이템 추가'}
                            </Button>
                            {showNewItemForm === stack.id && (
                                <VStack spacing={2} align="start" mt={2}>
                                    <Input
                                        placeholder="기술 이름"
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                                    />
                                    <Select
                                        placeholder="아이콘 선택"
                                        value={newItem.icon}
                                        onChange={(e) => setNewItem({...newItem, icon: e.target.value})}
                                    >
                                        {Object.keys(FaIcons)
                                            .concat(Object.keys(SiIcons), Object.keys(DiIcons))
                                            .map((iconKey) => (
                                                <option key={iconKey} value={iconKey}>
                                                    {iconKey}
                                                </option>
                                            ))}
                                    </Select>
                                    <Input
                                        placeholder="색상 (hex)"
                                        value={newItem.color}
                                        onChange={(e) => setNewItem({...newItem, color: e.target.value})}
                                    />
                                    <Button colorScheme="green" onClick={() => addItemToStack(stack.id)}>
                                        아이템 추가
                                    </Button>
                                </VStack>
                            )}
                            <Button colorScheme="red" onClick={() => deleteTechStack(stack.id)}>
                                스택 삭제
                            </Button>
                        </VStack>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}
