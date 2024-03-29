import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { Dropdown } from '#app/components/input/Dropdown';

import { SUPPORTED_LANGUAGES, Language } from '../i18n';
import { getLanguage, setLanguage } from '../store/i18nSlice';
import { nativeLanguageNames } from '../utils/languageMap';

export const LanguagePicker = () => {
  const { t } = useTranslation();
  const data = useMemo(
    () =>
      SUPPORTED_LANGUAGES.map((language: Language) => ({
        label: nativeLanguageNames?.[language]?.nativeName ?? language,
        value: language,
      })),
    [],
  );
  const selectedLanguage = useSelector(getLanguage);
  const dispatch = useDispatch();

  return (
    <Dropdown
      label={t('i18n.language')}
      onSelect={(value: Language) => dispatch(setLanguage(value))}
      selectedValue={selectedLanguage}
      data={data}
    />
  );
};
