import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useInventory} from '../../hooks/inventory';

import {Container, Text, Image} from './styles';

interface CategoryProps {
  image: string;
  name: string;
  id: number;
}

const Category: React.FC<CategoryProps> = ({image, name, id}) => {
  const {selectedCategory} = useInventory();
  const {navigate} = useNavigation();

  const handleCategory = useCallback(async () => {
    selectedCategory(id);
    navigate('Items');
  }, [navigate, id, selectedCategory]);

  return (
    <Container onPress={handleCategory}>
      <Text>{name}</Text>
      <Image
        source={{uri: `data:image/png;base64,${image}`}}
        resizeMode="cover"
      />
    </Container>
  );
};

export default Category;