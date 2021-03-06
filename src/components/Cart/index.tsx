import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import ItemList from '../ItemList';
import Button from '../Button';

import {useCart} from '../../hooks/cart';

import FormatReal from '../../utils/formartReal';

import {
  Container,
  Description,
  Icon,
  IconNumber,
  IconSpan,
  IconText,
  Total,
  TotalText,
} from './styles';
import {useInventory} from '../../hooks/inventory';

interface CartProps {
  showButtons?: boolean;
}

const Cart: React.FC<CartProps> = ({showButtons = true}) => {
  const {cart, amount, clearCart} = useCart();
  const {clearInventory} = useInventory();

  const {navigate, goBack} = useNavigation();

  const handleClear = useCallback(() => {
    clearCart();
    clearInventory();
  }, [clearCart, clearInventory]);

  return (
    <Container>
      <Description>
        <Icon>
          <IconText>Sacola</IconText>
          <IconFeather name="shopping-bag" size={40} color="#000" />
          <IconSpan>
            <IconNumber>{cart.length}</IconNumber>
          </IconSpan>
        </Icon>

        <FlatList
          data={cart}
          style={{flexGrow: 0}}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item}) => <ItemList key={`${item.id}`} item={item} />}
        />
      </Description>

      <Total>
        <TotalText>{`Total R$ ${FormatReal(amount)}`}</TotalText>
        {cart.length > 0 && (
          <>
            <Button style={{backgroundColor: '#fff'}} onPress={handleClear}>
              Limpar sacola
            </Button>
            <Button
              style={{backgroundColor: '#fff'}}
              onPress={() => (!showButtons ? goBack() : navigate('Payment'))}>
              {!showButtons ? 'Voltar' : 'Finalizar compra'}
            </Button>
          </>
        )}
      </Total>
    </Container>
  );
};

export default Cart;
