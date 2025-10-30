import { useTranslation } from "react-i18next";

const characterKeys = ["druid", "werewolf", "archer", "priest", "mage", "warrior"];

export default function CharacterSelector() {
  const { t } = useTranslation();

  return (
    <select >
      {characterKeys.map(key => (
        <option key={key} value={key}>
          {t(`characters.${key}`)}
        </option>
      ))}
    </select>
  )
}