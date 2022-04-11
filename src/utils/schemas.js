
// Schema utilizado para validar información al momento de crear un nuevo "character".
export const characterSchema = {
  name: {
    in: ['body'],
    errorMessage: 'The field name is required',
    exists: true,
    isLength: {
      errorMessage: 'The character name should be at least 3 chars long.',
      options: { min: 3 }
    }
  },
  species: {
    in: ['body'],
    errorMessage: 'The field species is required.',
    exists: true,
    isLength: {
      errorMessage: 'The field species should be at least 3 chars long.',
      options: { min: 3 }
    }
  },
  origin: {
    in: ['body'],
    errorMessage: 'The field origin is required.',
    exists: true,
    isLength: {
      errorMessage: 'The field origin should be at least 3 chars long.',
      options: { min: 3 }
    }
  },
  status: {
    in: ['body'],
    errorMessage: 'The field status is required.',
    exists: true,
    isLength: {
      errorMessage: 'The field status should be at least 3 chars long.',
      options: { min: 3 }
    }
  }
}
