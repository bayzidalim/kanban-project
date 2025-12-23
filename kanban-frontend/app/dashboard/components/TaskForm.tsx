'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaskFormData } from '../types';

interface TaskFormProps {
  onSubmit: (taskData: TaskFormData) => void;
  loading: boolean;
}

export const TaskForm = ({ onSubmit, loading }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    priority: 'low',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', priority: 'low' });
  };

  const handleInputChange = (field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 p-6 bg-white rounded-lg shadow-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full">
        <Input
          className="w-full md:max-w-xs"
          placeholder="New Task Title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          disabled={loading}
          required
        />
        <Select
          value={formData.priority}
          onValueChange={(value) => handleInputChange('priority', value)}
          disabled={loading}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={loading || !formData.title.trim()}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </Button>
      </form>
    </motion.div>
  );
}; 