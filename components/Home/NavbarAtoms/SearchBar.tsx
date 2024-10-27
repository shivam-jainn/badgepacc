'use client';
import { TextInput, Loader, Portal, Paper, Group, Avatar, Text } from '@mantine/core';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import classes from '../Navbar.module.css'

interface SearchResults {
    username: string;
    image: string;
}

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResults[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.length > 2) {
                fetchUsers(searchTerm);
            } else {
                setResults([]);
                setOpen(false);
            }
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const fetchUsers = async (search: string) => {
        setLoading(true);
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data.users);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <TextInput
                ref={inputRef}
                placeholder="Search"
                mb={'sm'}
                radius={'xl'}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onFocus={() => results.length > 0 && setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 200)}
                rightSection={loading ? <Loader size="xs" /> : null} // Loader inside TextInput
            />
            {open && (
                <Portal>
                    <Paper
                        radius="lg"
                        shadow="md"
                        mt={'0.5rem'}
                        style={{
                            position: 'absolute',
                            top: (inputRef.current?.getBoundingClientRect().bottom || 0) + 4,
                            left: inputRef.current?.getBoundingClientRect().left || 0,
                            width: inputRef.current?.offsetWidth || '100%',
                            zIndex: 10,
                            height: '200px',
                            overflowY: 'auto',
                            background:'grey'
                        }}
                    >
                        {results.length > 0 ? (
                            results.map((user, index) => (
                                <Group key={index} p="sm" className={classes.searchresult} onClick={()=>router.push(`/${user.username}`)}>
                                    <Avatar src={user.image} radius="xl" size="sm" />
                                    <Text>{user.username}</Text>
                                </Group>
                            ))
                        ) : (
                            <Text p="sm">No results found</Text>
                        )}
                    </Paper>
                </Portal>
            )}
        </div>
    );
}
