export const classWithOneProperty = 
`class Undefined {
    public $foo;
}
`;

export const classWithManyProperties = 
`class Undefined {
    public $foo;
    public $bar;
    public $jhon;
}
`;
export const classWithClassName = 
`class FOO {
    public $foo;
}
`;

export const classWithManyPropertiesAndProtectedVisibility = 
`class Undefined {
    protected $foo;
    protected $bar;
    protected $jhon;
}
`;

export const classWithCamelCase = 
`class Undefined {
    protected $camelCase;
}
`;

export const classWithTypedProperties = 
`class Typed {
    private bool $boolean;
    private string $string;
    private float $float;
    private int $int;
    private array $array;
    private MyObject $myObject;
}
`;

export const classWithNamespace = 
`namespace App\\Foo;

class Namespaced {
    public bool $boolean;
    public string $string;
}
`;

export const classWithGetters = 
`namespace App\\Foo;

class Namespaced {
    public $boolean;
    public $string;

    public function isBoolean(){
        return $this->boolean;
    }

    public function getString(){
        return $this->string;
    }
}
`;

export const classWithGettersAndReturnType = 
`namespace App\\Foo;

class Namespaced {
    public $boolean;
    public $string;

    public function isBoolean():bool{
        return $this->boolean;
    }

    public function getString():string{
        return $this->string;
    }
}
`;

export const classWithSetters = 
`namespace App\\Foo;

class Namespaced {
    public bool $boolean;
    public string $string;

    public function isBoolean():bool{
        return $this->boolean;
    }

    public function getString():string{
        return $this->string;
    }

    public function setBoolean(bool $boolean):void{
        $this->boolean = $boolean;
    }

    public function setString(string $string):void{
        $this->string = $string;
    }
}
`;

export const classWithSettersWithoutTypedMethod = 
`namespace App\\Foo;

class Namespaced {
    public bool $boolean;
    public string $string;

    public function isBoolean(){
        return $this->boolean;
    }

    public function getString(){
        return $this->string;
    }

    public function setBoolean($boolean){
        $this->boolean = $boolean;
    }

    public function setString($string){
        $this->string = $string;
    }
}
`

export const classWithArraySerialization = 
`namespace App\\Foo;

class Namespaced {
    public $boolean;
    public $string;

    public function __construct($boolean, $string){
        $this->boolean = $boolean;
        $this->string = $string;
    }

    public static function fromArray($data){
        return new Namespaced(
            $data["boolean"],
            $data["string"]
        );
    }

    public function toArray(){
        return [
            "boolean" => $this->boolean,
            "string" => $this->string
        ];
    }
}
`

export const classWithArraySerializationAndComplexTypes = 
`namespace App\\Foo;

class Namespaced {
    public Foo $foo;
    public array $bars;
    public bool $bool;

    public function __construct(Foo $foo, array $bars, bool $bool){
        $this->foo = $foo;
        $this->bars = $bars;
        $this->bool = $bool;
    }

    public static function fromArray(array $data):Namespaced{
        return new Namespaced(
            Foo::fromArray($data["foo"]),
            array_map(function($item){
                return Bar::fromArray($item);
            },$data["bars"]),
            $data["bool"]
        );
    }

    public function toArray():array{
        return [
            "foo"=>$this->foo->toArray(),
            "bars"=>array_map(function($item){
                return $item->toArray();
            },$this->bars),
            "bool" => $this->bool
        ];
    }
}
`