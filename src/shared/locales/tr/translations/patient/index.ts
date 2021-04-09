export default {
  patient: {
    label: 'Hasta',
    code: 'Hasta Kodu',
    firstName: 'İsim',
    lastName: 'Soyisim',
    suffix: 'Son ek',
    prefix: 'Ünvan',
    givenName: 'İsim',
    familyName: 'Soyisim',
    dateOfBirth: 'Doğum Tarihi',
    approximateDateOfBirth: 'Yaklaşık Doğum Tarihi',
    age: 'Yaş',
    approximateAge: 'Yaklaşık Yaş',
    placeOfBirth: 'Doğum Yeri',
    bloodType: 'Kan Grubu',
    sex: 'Cinsiyet',
    phoneNumber: 'Telefon Numarası',
    email: 'Email',
    address: 'Adres',
    contactInfoType: 'İletişim Bilgisi Türü',
    occupation: 'Meslek',
    type: 'Hasta Tipi',
    preferredLanguage: 'Tercih Edilen Dil',
    basicInformation: 'Temel Bilgi',
    generalInformation: 'Genel Bilgi',
    contactInformation: 'İletişim Bilgisi',
    unknownDateOfBirth: 'Doğum Tarihi Bilinmiyor',
    relatedPerson: 'Akrabalar',
    relatedPersons: {
      error: {
        unableToAddRelatedPerson: 'Akrabalar kısmına yeni kişi eklenemiyor.',
        relatedPersonRequired: 'Akraba alanı gereklidir.',
        relationshipTypeRequired: 'Akrabalık türü gereklidir.',
      },
      label: 'Akrabalar',
      new: 'Yeni Akraba',
      add: 'Akrabayı Ekle',
      relationshipType: 'Akrabalık Türü',
      warning: {
        noRelatedPersons: 'Akraba bulunamadı.',
      },
      addRelatedPersonAbove: 'Üstteki buton ile yeni akraba ekleyebilirsiniz.',
    },
    appointments: {
      new: 'Yeni Randevu Ekle',
      warning: 'Uyarı',
      addAppointmentAbove: 'Randevuyu Üste Ekle',
    },
    allergies: {
      label: 'Alerjiler',
      allergyName: 'Alerji Adı',
      new: 'Yeni Alerji Ekle',
      error: {
        nameRequired: 'Ad girilmesi zorunludur.',
        unableToAdd: 'Alerji eklenemiyor.',
      },
      warning: {
        noAllergies: 'Alerji kaydı yok.',
      },
      addAllergyAbove: 'Üstteki buton ile yeni alerji ekleyebilirsiniz.',
      successfullyAdded: 'Yeni alerji kaydı başarılı bir şekilde eklendi!',
    },
    diagnoses: {
      label: 'Tanılar',
      new: 'Yeni Tanı Ekle',
      diagnosisName: 'Tanı Adı',
      diagnosisDate: 'Tanı Eklenme Tarihi',
      warning: {
        noDiagnoses: 'Tanı kaydı bulunamadı.',
      },
      error: {
        nameRequired: 'Tanı Adı girilmesi zorunludur.',
        dateRequired: 'Tanı Ekleme Tarihi girilmesi zorunludur.',
        unableToAdd: 'Yeni tanı eklenemiyor.',
      },
      addDiagnosisAbove: 'Üstteki buton ile yeni tanı ekleyebilirsiniz.',
      successfullyAdded: 'Yeni tanı kaydı başarılı bir şekilde eklendi!',
    },
    note: 'Not',
    notes: {
      label: 'Notlar',
      new: 'Yeni Not Ekle',
      warning: {
        noNotes: 'Not bulunamadı.',
      },
      error: {
        noteRequired: 'Not kısmı doldurulması zorunludur.',
        unableToAdd: 'Yeni not eklenemiyor.',
      },
      addNoteAbove: 'Üstteki buton ile yeni not ekleyebilirsiniz.',
    },
    labs: {
      label: 'Laboratuvarlar',
      new: 'Yeni Laboratuvar Ekle',
      warning: {
        noLabs: 'Laboratuvar bulunamadı.',
      },
      noLabsMessage: 'Bu hasta için Laboratuvar talebi bulunamadı.',
    },
    types: {
      charity: 'Ücretsiz/İndirimli',
      private: 'Özel',
    },
    errors: {
      createPatientError: 'Yeni hasta eklenemiyor.',
      updatePatientError: 'Hasta güncellenemiyor.',
      patientGivenNameFeedback: 'İsim alanı zorunludur.',
      patientDateOfBirthFeedback: 'Doğum Tarihi bugünden büyük olmamalıdır.',
      patientNumInSuffixFeedback: 'Rakam içermemelidir.',
      patientNumInPrefixFeedback: 'Rakam içermemelidir.',
      patientNumInFamilyNameFeedback: 'Rakam içermemelidir.',
      patientNumInPreferredLanguageFeedback: 'Rakam içermemelidir.',
      invalidEmail: 'Email adresi geçerli bir adres olmalıdır.',
      invalidPhoneNumber: 'Telefon numarası geçerli bir numara olmalıdır.',
    },
  },
}
