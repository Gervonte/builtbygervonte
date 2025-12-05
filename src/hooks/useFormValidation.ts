'use client';

import { validateFormField, ValidationResult } from '@/lib/validation';
import React, { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';

export interface FormFieldState {
  value: string;
  error?: string;
  touched: boolean;
  isValid: boolean;
}

export interface FormState {
  [key: string]: FormFieldState;
}

export interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  initialValues: Partial<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export function useFormValidation<T extends Record<string, unknown>>({
  schema,
  initialValues,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFormValidationOptions<T>) {
  // Initialize form state
  const [formState, setFormState] = useState<FormState>(() => {
    const state: FormState = {};
    Object.keys(initialValues).forEach(key => {
      state[key] = {
        value: String(initialValues[key] || ''),
        error: undefined,
        touched: false,
        isValid: true,
      };
    });
    return state;
  });

  // Update field value
  const setFieldValue = useCallback(
    (fieldName: keyof T, value: string) => {
      setFormState(prev => {
        const newState = { ...prev };
        const fieldState = { ...prev[fieldName as string] };

        fieldState.value = value;
        fieldState.touched = true;

        // Validate on change if enabled
        if (validateOnChange) {
          const fieldSchema = (schema as { shape?: Record<string, unknown> }).shape?.[
            fieldName as string
          ];
          if (fieldSchema && typeof fieldSchema === 'object' && 'safeParse' in fieldSchema) {
            const validation = validateFormField(
              fieldSchema as z.ZodSchema<unknown>,
              value,
              fieldName as string
            );
            fieldState.isValid = validation.isValid;
            fieldState.error = validation.error;
          }
        }

        newState[fieldName as string] = fieldState;
        return newState;
      });
    },
    [schema, validateOnChange]
  );

  // Update field touched state
  const setFieldTouched = useCallback(
    (fieldName: keyof T, touched: boolean = true) => {
      setFormState(prev => {
        const newState = { ...prev };
        const fieldState = { ...prev[fieldName as string] };

        fieldState.touched = touched;

        // Validate on blur if enabled
        if (validateOnBlur && touched) {
          const fieldSchema = (schema as { shape?: Record<string, unknown> }).shape?.[
            fieldName as string
          ];
          if (fieldSchema && typeof fieldSchema === 'object' && 'safeParse' in fieldSchema) {
            const validation = validateFormField(
              fieldSchema as z.ZodSchema<unknown>,
              fieldState.value,
              fieldName as string
            );
            fieldState.isValid = validation.isValid;
            fieldState.error = validation.error;
          }
        }

        newState[fieldName as string] = fieldState;
        return newState;
      });
    },
    [schema, validateOnBlur]
  );

  // Validate entire form
  const validateForm = useCallback((): ValidationResult<T> => {
    try {
      const formData = Object.keys(formState).reduce(
        (acc, key) => {
          acc[key] = formState[key].value;
          return acc;
        },
        {} as Record<string, unknown>
      );

      const result = schema.safeParse(formData);

      if (result.success) {
        return {
          success: true,
          data: result.data,
        };
      } else {
        // Update field errors
        setFormState(prev => {
          const newState = { ...prev };
          result.error.issues.forEach((error: z.ZodIssue) => {
            const fieldName = error.path[0] as string;
            if (fieldName && newState[fieldName]) {
              newState[fieldName] = {
                ...newState[fieldName],
                error: error.message,
                isValid: false,
                touched: true,
              };
            }
          });
          return newState;
        });

        return {
          success: false,
          errors: result.error,
          errorMessage: result.error.issues
            .map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`)
            .join('; '),
        };
      }
    } catch (error) {
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Validation error',
      };
    }
  }, [formState, schema]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormState(prev => {
      const newState: FormState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = {
          value: String(initialValues[key as keyof T] || ''),
          error: undefined,
          touched: false,
          isValid: true,
        };
      });
      return newState;
    });
  }, [initialValues]);

  // Get field props for input components
  const getFieldProps = useCallback(
    (fieldName: keyof T) => {
      const fieldState = formState[fieldName as string];
      return {
        value: fieldState?.value || '',
        error: fieldState?.error,
        onBlur: () => setFieldTouched(fieldName),
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue(fieldName, event.target.value),
      };
    },
    [formState, setFieldValue, setFieldTouched]
  );

  // Get field props for textarea components
  const getTextareaProps = useCallback(
    (fieldName: keyof T) => {
      const fieldState = formState[fieldName as string];
      return {
        value: fieldState?.value || '',
        error: fieldState?.error,
        onBlur: () => setFieldTouched(fieldName),
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setFieldValue(fieldName, event.target.value),
      };
    },
    [formState, setFieldValue, setFieldTouched]
  );

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return Object.values(formState).every(field => field.isValid);
  }, [formState]);

  // Check if form has been touched
  const isFormTouched = useMemo(() => {
    return Object.values(formState).some(field => field.touched);
  }, [formState]);

  // Get form data
  const getFormData = useCallback((): Partial<T> => {
    const formData: Partial<T> = {};
    Object.keys(formState).forEach(key => {
      formData[key as keyof T] = formState[key].value as T[keyof T];
    });
    return formData;
  }, [formState]);

  return {
    formState,
    setFieldValue,
    setFieldTouched,
    validateForm,
    resetForm,
    getFieldProps,
    getTextareaProps,
    isFormValid,
    isFormTouched,
    getFormData,
  };
}

// Specialized hook for contact form
export function useContactFormValidation() {
  const { contactFormSchema } = require('@/lib/schemas');

  return useFormValidation({
    schema: contactFormSchema,
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      company: '',
      phone: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
  });
}

// Specialized hook for project form
export function useProjectFormValidation() {
  const { projectSchema } = require('@/lib/schemas');

  return useFormValidation({
    schema: projectSchema,
    initialValues: {
      id: '',
      title: '',
      description: '',
      type: 'standard-work',
      technologies: [],
      featured: false,
      status: 'live',
    },
    validateOnChange: true,
    validateOnBlur: true,
  });
}
