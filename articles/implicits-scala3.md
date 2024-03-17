## Implicits in Scala 3

Scala 3 has made significant changes to implicits, aiming to simplify the concepts and make them more intuitive. This article explores the migration from Scala 2 implicits to Scala 3’s new features.

### **Given Instances (Replaces Implicit Values and Implicit Objects)** 
Scala 3 replaces implicit objects and implicit vals with given instances. These are used to define typeclass instances.

*Scala 2 Style:*
```scala
implicit val ordering: Ordering[Int] = Ordering.fromLessThan(_ > _)
```
*Scala 3 Style:*
```scala
given ordering: Ordering[Int] with
  def compare(x: Int, y: Int): Int = y - x
```
In the above example, the given keyword clearly indicates that ordering is available globally for any function that requires an Ordering[Int].

### **Using Clauses (Replaces Implicit Parameters)** 
To replace implicit parameters, which Scala 3 refers to as **context parameters**, Scala 3 introduces using clauses. This feature explicitly states where the implicits are used, improving readability and maintainability.

*Scala 2 Style:*
```scala
def maxList[T](elements: List[T])(implicit ordering: Ordering[T]): T =
  elements.max
```
*Scala 3 Style:*
```scala
def maxList[T](elements: List[T])(using ordering: Ordering[T]): T =
  elements.max
```
The using keyword explicitly shows that ordering is a required implicit parameter.

### **Extension Methods (Replaces Implicit Classes)** 
Scala 3 simplifies the creation of extension methods, making the syntax more straightforward and limiting the scope of implicits.

*Scala 2 Style:*
```scala
implicit class RichInt(val x: Int) {
  def isEven: Boolean = x % 2 == 0
}
```
*Scala 3 Style:*
```scala
extension (x: Int)
  def isEven: Boolean = x % 2 == 0
```
Extension methods in Scala 3 use the extension keyword, which directly extends the functionality of existing types without requiring an implicit class.

### **Summon (Replaces implicitly)**
In Scala 2,  implicitly  is a method used to search for an implicit value that matches a given type. It is often used to resolve implicit parameters or conversions automatically provided within the scope.  
*Scala 2 Style:*
```scala
implicit val myImplicitInt: Int = 10
val example = implicitly[Int]  // Retrieves the implicit Int
```

Scala 3 introduces  summon  as a clearer and more explicit way to retrieve an instance from the given instances available in the scope. It works similarly to  implicitly  but is part of the new given/using paradigm.  
*Scala 3 Style:*
```scala
given myGivenInt: Int = 10

val example = summon[Int]  // Retrieves the given Int
```


### Context functions (Replaces some functionalities of Implicit Parameters)
Scala 3 introduces context functions as a more refined way to handle scenarios where functions need context parameters (like implicits) but in a more type-safe and straightforward manner. Context functions are a special kind of function type that takes a context parameter.

*Scala 2 Style:*
```scala
def getExecutionContext(implicit ec: ExecutionContext): Unit = ec.reportFailure(new Exception("foo"))
```

*Scala 3 Style:*
```scala
val getExecutionContext = (ec: ExecutionContext) ?=> ec.reportFailure(new Exception("foo"))
```

