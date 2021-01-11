package fr.formation.itschool.masterpiece.dtos;

/**
 * * A DTO representation of a {@code Risk}
 */
public class RiskViewDto {
    private Long id;
    private String code;
    private String label;

    protected RiskViewDto() {
    }


    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getLabel() {
        return label;
    }

    @Override
    public String toString() {
        return "RiskViewDto{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", label='" + label + '\'' +
                '}';
    }
}
