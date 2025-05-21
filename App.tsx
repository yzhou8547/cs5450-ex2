import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  stock: number;
}

type Category = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  products: Product[];
};

const shopData: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    emoji: '📱',
    color: '#FF6B6B',
    products: [
      { id: '1-1', name: 'Smartphone', price: '$599', description: 'Latest model with 128GB storage', stock: 15 },
      { id: '1-2', name: 'Laptop', price: '$999', description: '15-inch, 16GB RAM', stock: 8 },
      { id: '1-3', name: 'Headphones', price: '$199', description: 'Noise cancelling wireless', stock: 23 }
    ]
  },
  {
    id: '2', 
    name: 'Clothing',
    emoji: '👕',
    color: '#4ECDC4',
    products: [
      { id: '2-1', name: 'T-Shirt', price: '$25', description: '100% cotton, various colors', stock: 42 },
      { id: '2-2', name: 'Jeans', price: '$59', description: 'Slim fit, dark blue', stock: 17 }
    ]
  },
  {
    id: '3',
    name: 'Home',
    emoji: '🏠',
    color: '#FFD166',
    products: [
      { id: '3-1', name: 'Coffee Maker', price: '$89', description: 'Programmable 12-cup', stock: 11 },
      { id: '3-2', name: 'Blender', price: '$49', description: '600W with 5-speed control', stock: 9 }
    ]
  },
  {
    id: '4',
    name: 'Books',
    emoji: '📚',
    color: '#A0C4FF',
    products: [
      { id: '4-1', name: 'Novel', price: '$15', description: 'Bestselling fiction', stock: 32 },
      { id: '4-2', name: 'Textbook', price: '$120', description: 'Computer Science', stock: 5 }
    ]
  },
  {
    id: '5',
    name: 'Sports',
    emoji: '⚽',
    color: '#FF9F1C',
    products: [
      { id: '5-1', name: 'Basketball', price: '$35', description: 'Official size 7', stock: 19 },
      { id: '5-2', name: 'Yoga Mat', price: '$45', description: 'Non-slip surface', stock: 27 }
    ]
  },
  {
    id: '6',
    name: 'Beauty',
    emoji: '💄',
    color: '#FF85A1',
    products: [
      { id: '6-1', name: 'Perfume', price: '$75', description: '50ml Eau de Parfum', stock: 13 },
      { id: '6-2', name: 'Lipstick', price: '$22', description: 'Long lasting matte', stock: 24 }
    ]
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pressedCategoryId, setPressedCategoryId] = useState<string | null>(null);

  const renderCategory = ({ item }: { item: Category }) => {
    const isPressed = pressedCategoryId === item.id;
    
    return (
      <TouchableOpacity 
        style={[
          styles.categoryContainer,
          isPressed && styles.pressedEffect
        ]}
        onPressIn={() => setPressedCategoryId(item.id)}
        onPressOut={() => setPressedCategoryId(null)}
        onPress={() => setSelectedCategory(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.circle, { backgroundColor: item.color }]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <Text style={[styles.categoryName, { color: item.color }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!selectedCategory ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Shop Categories</Text>
          <Text style={styles.debugText}>Total categories: {shopData.length}</Text>
          <View style={styles.categoriesGrid}>
            {shopData.map((category) => renderCategory({ item: category }))}
          </View>
        </ScrollView>
      ) : selectedProduct ? (
        <View style={styles.productDetailContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedProduct(null)}
          >
            <Text style={styles.backText}>← Back to {selectedCategory.name}</Text>
          </TouchableOpacity>
          
          <View style={styles.productDetailCard}>
            <View style={[styles.productDetailHeader, { backgroundColor: selectedCategory.color }]}>
              <Text style={styles.productDetailEmoji}>{selectedCategory.emoji}</Text>
              <Text style={styles.productDetailName}>{selectedProduct.name}</Text>
            </View>
            
            <View style={styles.productDetailContent}>
              <Text style={styles.productDetailPrice}>{selectedProduct.price}</Text>
              <Text style={styles.productDetailDescription}>{selectedProduct.description}</Text>
              
              <View style={styles.stockContainer}>
                <Text style={styles.stockLabel}>Stock State:</Text>
                <View style={styles.stockIndicatorContainer}>
                  <View 
                    style={[
                      styles.stockIndicator, 
                      { 
                        backgroundColor: selectedProduct.stock > 10 
                          ? '#4CAF50'
                          : selectedProduct.stock > 5 
                            ? '#FFC107'
                            : '#F44336'
                      }
                    ]} 
                  />
                  <Text style={styles.stockCount}>
                    {selectedProduct.stock}
                    {selectedProduct.stock <= 5 ? ' (In stock)' : 
                     selectedProduct.stock <= 10 ? ' (Low stock)' : ' (In stock)'}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.addToCartButton,
                  { backgroundColor: selectedCategory.color }
                ]}
              >
                <Text style={styles.addToCartText}>Add to chart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.messagesContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={styles.backText}>← Back to Categories</Text>
          </TouchableOpacity>
          <Text style={styles.dirTitle}>{selectedCategory.name}</Text>
          <FlatList
            data={selectedCategory.products}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.productItem}
                onPress={() => setSelectedProduct(item)}
              >
                <View style={styles.productItemHeader}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
                <Text style={styles.productDesc}>{item.description}</Text>
                <View style={styles.productStockRow}>
                  <View 
                    style={[
                      styles.stockDot, 
                      { 
                        backgroundColor: item.stock > 10 
                          ? '#4CAF50'
                          : item.stock > 5 
                            ? '#FFC107'
                            : '#F44336' 
                      }
                    ]} 
                  />
                  <Text style={styles.productStockText}>
                    stock: {item.stock}
                    {item.stock <= 5 ? ' (sufficient)' : item.stock <= 10 ? ' (limited)' : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  debugText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  categoryContainer: {
    alignItems: 'center',
    margin: 15,
    padding: 10,
    borderRadius: 10,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 36,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  pressedEffect: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  backButton: {
    padding: 10,
    marginBottom: 15,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  dirTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  productItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  productDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productStockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  stockDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  productStockText: {
    fontSize: 12,
    color: '#555',
  },
  // 商品详情视图样式
  productDetailContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  productDetailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productDetailHeader: {
    padding: 20,
    alignItems: 'center',
  },
  productDetailEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  productDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  productDetailContent: {
    padding: 20,
  },
  productDetailPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  productDetailDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 25,
  },
  stockContainer: {
    marginVertical: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
  },
  stockLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  stockIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  stockCount: {
    fontSize: 18,
    fontWeight: '500',
  },
  addToCartButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});