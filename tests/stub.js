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